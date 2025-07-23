import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AdminNav from '@/components/layout/admin-nav';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { MenuItem, Category } from '@shared/schema';

export default function AdminMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    nameEn: '',
    nameSo: '',
    description: '',
    price: '',
    categoryId: '',
    image: '',
    isAvailable: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: menuItems = [], isLoading: itemsLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu-items'],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const createItemMutation = useMutation({
    mutationFn: async (itemData: any) => {
      const response = await apiRequest('POST', '/api/menu-items', itemData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/menu-items'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Menu item created successfully!",
        description: "The new menu item has been added.",
      });
    },
    onError: () => {
      toast({
        title: "Creation failed",
        description: "There was an error creating the menu item.",
        variant: "destructive",
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await apiRequest('PATCH', `/api/menu-items/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/menu-items'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      toast({
        title: "Menu item updated successfully!",
        description: "The menu item has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was an error updating the menu item.",
        variant: "destructive",
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/menu-items/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/menu-items'] });
      toast({
        title: "Menu item deleted successfully!",
        description: "The menu item has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the menu item.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      nameEn: '',
      nameSo: '',
      description: '',
      price: '',
      categoryId: '',
      image: '',
      isAvailable: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name: formData.nameEn,
      nameEn: formData.nameEn,
      nameSo: formData.nameSo,
      description: formData.description,
      price: parseInt(formData.price),
      categoryId: parseInt(formData.categoryId),
      image: formData.image,
      isAvailable: formData.isAvailable,
      isActive: true,
    };

    if (editingItem) {
      updateItemMutation.mutate({ id: editingItem.id, ...itemData });
    } else {
      createItemMutation.mutate(itemData);
    }
  };

  const handleEdit = (item: MenuItem) => {
    console.log('Edit clicked for item:', item);
    setEditingItem(item);
    setFormData({
      nameEn: item.nameEn,
      nameSo: item.nameSo,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId?.toString() || '',
      image: item.image || '',
      isAvailable: item.isAvailable || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log('Delete clicked for item ID:', id);
    if (confirm('Are you sure you want to delete this menu item?')) {
      deleteItemMutation.mutate(id);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? `${category.nameSo} (${category.nameEn})` : 'Unknown';
  };

  if (itemsLoading || categoriesLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}>
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}>
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '32px'
        }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: '700', 
                color: 'white', 
                fontFamily: 'Playfair Display',
                marginBottom: '8px'
              }}>
                Menu Management
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Manage your restaurant menu items
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    border: 'none',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
                  }}
                  onClick={() => {
                    setEditingItem(null);
                    resetForm();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
                  }}
                >
                  <Plus style={{ width: '20px', height: '20px' }} />
                  Add Menu Item
                </div>
              </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair text-darkbrown">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nameEn">English Name *</Label>
                    <Input
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                      placeholder="Grilled Meat"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nameSo">Somali Name *</Label>
                    <Input
                      id="nameSo"
                      value={formData.nameSo}
                      onChange={(e) => setFormData(prev => ({ ...prev, nameSo: e.target.value }))}
                      placeholder="Hilib Shiilan"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tender grilled meat seasoned with traditional Somali spices"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KES) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="1200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category *</Label>
                    <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.nameSo} ({category.nameEn})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '24px',
                      borderRadius: '12px',
                      background: formData.isAvailable 
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                        : '#e5e7eb',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent'
                    }}
                    onClick={() => {
                      console.log('Toggle clicked, current state:', formData.isAvailable);
                      setFormData(prev => ({ ...prev, isAvailable: !prev.isAvailable }));
                    }}
                  >
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'white',
                        position: 'absolute',
                        top: '1px',
                        left: formData.isAvailable ? '29px' : '1px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Available for ordering
                  </span>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={createItemMutation.isPending || updateItemMutation.isPending}
                  >
                    {createItemMutation.isPending || updateItemMutation.isPending 
                      ? 'Saving...' 
                      : editingItem ? 'Update Item' : 'Create Item'
                    }
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
            >
              {item.image && (
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.nameEn}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: '#8b4513', 
                      fontFamily: 'Playfair Display',
                      marginBottom: '4px'
                    }}>
                      {item.nameEn}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'Dancing Script' }}>{item.nameSo}</p>
                  </div>
                  <div style={{
                    background: item.isAvailable ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#6b7280',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                </div>
                
                <p style={{ color: '#6b7280', marginBottom: '12px', fontSize: '14px', lineHeight: '1.5' }}>{item.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    KES {item.price}
                  </span>
                  <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {getCategoryName(item.categoryId!)}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      borderRadius: '10px',
                      padding: '10px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flex: 1,
                      gap: '4px'
                    }}
                    onClick={() => handleEdit(item)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Edit style={{ width: '16px', height: '16px' }} />
                    Edit
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '10px',
                      padding: '10px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleDelete(item.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <UtensilsCrossed style={{ width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>No menu items yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Start by adding your first menu item</p>
            <div 
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '16px',
                padding: '12px 24px',
                border: 'none',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
              }}
              onClick={() => {
                setEditingItem(null);
                resetForm();
                setIsDialogOpen(true);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Add Menu Item
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
