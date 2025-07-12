/*
  # Add QR Template Support

  1. Schema Updates
    - Add template and style columns to qr_codes table
    - Update customization JSONB to support new template options

  2. Data Migration
    - Set default template values for existing QR codes
*/

-- Add template support columns
DO $$
BEGIN
  -- Add template column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'qr_codes' AND column_name = 'template'
  ) THEN
    ALTER TABLE qr_codes ADD COLUMN template text DEFAULT 'classic';
  END IF;

  -- Update existing customization data to include template info
  UPDATE qr_codes 
  SET customization = customization || jsonb_build_object(
    'template', 'classic',
    'dotStyle', 'square',
    'cornerStyle', 'square',
    'backgroundStyle', 'square'
  )
  WHERE customization IS NOT NULL 
  AND NOT (customization ? 'template');

  -- Set default customization for records without it
  UPDATE qr_codes 
  SET customization = jsonb_build_object(
    'foregroundColor', '#000000',
    'backgroundColor', '#FFFFFF',
    'size', 200,
    'margin', 2,
    'template', 'classic',
    'dotStyle', 'square',
    'cornerStyle', 'square',
    'backgroundStyle', 'square'
  )
  WHERE customization IS NULL;
END $$;

-- Add index for template searches
CREATE INDEX IF NOT EXISTS idx_qr_codes_template ON qr_codes (template);