import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { QRCode, QRAnalytics } from '../types';

export const useQRCodes = () => {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        shortCode: item.short_code,
        destinationUrl: item.destination_url,
        isActive: item.is_active,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
      
      setQRCodes(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addQRCode = async (qrCode: Omit<QRCode, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .insert([{
          name: qrCode.name,
          short_code: qrCode.shortCode,
          destination_url: qrCode.destinationUrl,
          is_active: qrCode.isActive
        }])
        .select()
        .single();

      if (error) throw error;
      
      const transformedData = {
        id: data.id,
        name: data.name,
        shortCode: data.short_code,
        destinationUrl: data.destination_url,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setQRCodes(prev => [transformedData, ...prev]);
      return transformedData;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add QR code');
    }
  };

  const updateQRCode = async (id: string, updates: Partial<QRCode>) => {
    try {
      const dbUpdates: any = { ...updates };
      if ('shortCode' in updates) {
        dbUpdates.short_code = updates.shortCode;
        delete dbUpdates.shortCode;
      }
      if ('destinationUrl' in updates) {
        dbUpdates.destination_url = updates.destinationUrl;
        delete dbUpdates.destinationUrl;
      }
      if ('isActive' in updates) {
        dbUpdates.is_active = updates.isActive;
        delete dbUpdates.isActive;
      }
      
      const { data, error } = await supabase
        .from('qr_codes')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const transformedData = {
        id: data.id,
        name: data.name,
        shortCode: data.short_code,
        destinationUrl: data.destination_url,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setQRCodes(prev => prev.map(qr => qr.id === id ? transformedData : qr));
      return transformedData;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update QR code');
    }
  };

  const deleteQRCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setQRCodes(prev => prev.filter(qr => qr.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete QR code');
    }
  };

  const getQRAnalytics = async (qrCodeId: string): Promise<QRAnalytics[]> => {
    try {
      const { data, error } = await supabase
        .from('qr_analytics')
        .select('*')
        .eq('qr_code_id', qrCodeId)
        .order('scanned_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.id,
        qrCodeId: item.qr_code_id,
        ipAddress: item.ip_address,
        country: item.country,
        city: item.city,
        deviceType: item.device_type,
        operatingSystem: item.operating_system,
        userAgent: item.user_agent,
        scannedAt: item.scanned_at
      }));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch analytics');
    }
  };

  const generateShortCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toLowerCase();
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  return {
    qrCodes,
    loading,
    error,
    addQRCode,
    updateQRCode,
    deleteQRCode,
    getQRAnalytics,
    generateShortCode,
    refetch: fetchQRCodes
  };
};