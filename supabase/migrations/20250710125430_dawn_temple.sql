/*
  # QR Code Management System

  1. New Tables
    - `qr_codes`
      - `id` (uuid, primary key)
      - `name` (text, QR code name/title)
      - `short_code` (text, unique short identifier)
      - `destination_url` (text, target URL)
      - `is_active` (boolean, enable/disable toggle)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `qr_analytics`
      - `id` (uuid, primary key)
      - `qr_code_id` (uuid, foreign key)
      - `ip_address` (text, visitor IP)
      - `country` (text, visitor country)
      - `city` (text, visitor city)
      - `device_type` (text, mobile/desktop/tablet)
      - `operating_system` (text, OS info)
      - `user_agent` (text, full user agent)
      - `scanned_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public QR access and admin management
    
  3. Indexes
    - Performance indexes for analytics queries
    - Unique constraint on short_code
*/

-- Create QR codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_code text UNIQUE NOT NULL,
  destination_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create QR analytics table
CREATE TABLE IF NOT EXISTS qr_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id uuid NOT NULL,
  ip_address text,
  country text,
  city text,
  device_type text,
  operating_system text,
  user_agent text,
  scanned_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_analytics ENABLE ROW LEVEL SECURITY;

-- QR Codes policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'qr_codes' AND policyname = 'Anyone can view active QR codes'
  ) THEN
    CREATE POLICY "Anyone can view active QR codes"
      ON qr_codes
      FOR SELECT
      TO anon, authenticated
      USING (is_active = true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'qr_codes' AND policyname = 'Admin can manage QR codes'
  ) THEN
    CREATE POLICY "Admin can manage QR codes"
      ON qr_codes
      FOR ALL
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- QR Analytics policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'qr_analytics' AND policyname = 'Anyone can insert analytics'
  ) THEN
    CREATE POLICY "Anyone can insert analytics"
      ON qr_analytics
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'qr_analytics' AND policyname = 'Admin can view all analytics'
  ) THEN
    CREATE POLICY "Admin can view all analytics"
      ON qr_analytics
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Add foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'qr_analytics_qr_code_id_fkey'
  ) THEN
    ALTER TABLE qr_analytics ADD CONSTRAINT qr_analytics_qr_code_id_fkey 
    FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_code ON qr_codes(short_code);
CREATE INDEX IF NOT EXISTS idx_qr_codes_active ON qr_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_qr_analytics_qr_code_id ON qr_analytics(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_analytics_scanned_at ON qr_analytics(scanned_at);
CREATE INDEX IF NOT EXISTS idx_qr_analytics_country ON qr_analytics(country);

-- Create trigger for updated_at on qr_codes
DROP TRIGGER IF EXISTS update_qr_codes_updated_at ON qr_codes;
CREATE TRIGGER update_qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();