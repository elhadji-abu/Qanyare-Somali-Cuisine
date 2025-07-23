import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Star, Check, X, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminNav from '@/components/layout/admin-nav';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Review } from '@shared/schema';

export default function AdminReviews() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: number; isApproved: boolean }) => {
      const response = await apiRequest('PATCH', `/api/reviews/${id}`, { isApproved });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review updated successfully",
        description: "The review status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was an error updating the review.",
        variant: "destructive",
      });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/reviews/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review deleted successfully",
        description: "The review has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the review.",
        variant: "destructive",
      });
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleApprove = (id: number) => {
    updateReviewMutation.mutate({ id, isApproved: true });
  };

  const handleReject = (id: number) => {
    updateReviewMutation.mutate({ id, isApproved: false });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      deleteReviewMutation.mutate(id);
    }
  };

  const filteredReviews = statusFilter === 'all' 
    ? reviews 
    : reviews.filter(review => {
        if (statusFilter === 'approved') return review.isApproved;
        if (statusFilter === 'pending') return !review.isApproved;
        return true;
      });

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 15%, #f093fb 30%, #f5576c 45%, #4facfe 60%, #00f2fe 75%, #43e97b 90%, #38f9d7 100%)',
        animation: 'gradientShift 8s ease infinite',
        backgroundSize: '400% 400%'
      }}>
        <AdminNav />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(255,255,255,0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '1rem', color: 'white', fontSize: '1.1rem', fontWeight: '500' }}>Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  const approvedCount = reviews.filter(r => r.isApproved).length;
  const pendingCount = reviews.filter(r => !r.isApproved).length;
  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 15%, #f093fb 30%, #f5576c 45%, #4facfe 60%, #00f2fe 75%, #43e97b 90%, #38f9d7 100%)',
      animation: 'gradientShift 8s ease infinite',
      backgroundSize: '400% 400%'
    }}>
      <AdminNav />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.25rem', 
              fontFamily: 'Playfair Display', 
              fontWeight: 'bold', 
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              marginBottom: '0.5rem'
            }}>Reviews Management</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>Manage customer reviews and ratings</p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger style={{
                width: '192px',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '8px'
              }}>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
          }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>{reviews.length}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '500' }}>Total Reviews</div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
          }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>{approvedCount}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '500' }}>Approved</div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
          }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>{pendingCount}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '500' }}>Pending</div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
          }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #f5576c, #f093fb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>{avgRating.toFixed(1)}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '500' }}>Average Rating</div>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
              }}
            >
              {/* Gradient accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: review.isApproved 
                  ? 'linear-gradient(90deg, #00b894, #00cec9)' 
                  : 'linear-gradient(90deg, #fdcb6e, #f39c12)'
              }}></div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between', 
                marginBottom: '1.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    marginRight: '1rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}>
                    {review.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 style={{ 
                      fontFamily: 'Playfair Display', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '1.2rem',
                      marginBottom: '0.5rem'
                    }}>{review.customerName}</h4>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '2px', marginRight: '0.5rem' }}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            style={{
                              width: '20px',
                              height: '20px',
                              color: i < review.rating ? '#ffd700' : 'rgba(255,255,255,0.3)',
                              fill: i < review.rating ? '#ffd700' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>({review.rating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: review.isApproved 
                    ? 'linear-gradient(45deg, #00b894, #00cec9)' 
                    : 'linear-gradient(45deg, #fdcb6e, #f39c12)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {review.isApproved ? 'Approved' : 'Pending'}
                </div>
              </div>

              <p style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontStyle: 'italic', 
                marginBottom: '1.5rem',
                fontSize: '1rem',
                lineHeight: '1.6',
                padding: '1rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                borderLeft: '4px solid #ff6b6b'
              }}>"{review.comment}"</p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: '500'
                }}>
                  {new Date(review.createdAt!).toLocaleDateString()}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {!review.isApproved && (
                    <div
                      onClick={() => handleApprove(review.id)}
                      style={{
                        background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'transform 0.2s ease',
                        opacity: updateReviewMutation.isPending ? 0.6 : 1,
                        pointerEvents: updateReviewMutation.isPending ? 'none' : 'auto'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Check style={{ width: '16px', height: '16px' }} />
                      Approve
                    </div>
                  )}
                  
                  {review.isApproved && (
                    <div
                      onClick={() => handleReject(review.id)}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'transform 0.2s ease',
                        opacity: updateReviewMutation.isPending ? 0.6 : 1,
                        pointerEvents: updateReviewMutation.isPending ? 'none' : 'auto'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <X style={{ width: '16px', height: '16px' }} />
                      Unapprove
                    </div>
                  )}
                  
                  <div
                    onClick={() => handleDelete(review.id)}
                    style={{
                      background: 'linear-gradient(45deg, #f5576c, #f093fb)',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s ease',
                      opacity: deleteReviewMutation.isPending ? 0.6 : 1,
                      pointerEvents: deleteReviewMutation.isPending ? 'none' : 'auto'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <Star style={{ 
              width: '64px', 
              height: '64px', 
              color: 'rgba(255,255,255,0.4)', 
              margin: '0 auto 1rem auto' 
            }} />
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: 'white', 
              marginBottom: '0.5rem' 
            }}>No reviews found</h3>
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '1rem' 
            }}>
              {statusFilter === 'pending' ? 'No pending reviews at the moment.' : 
               statusFilter === 'approved' ? 'No approved reviews yet.' : 
               'No reviews have been submitted yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
