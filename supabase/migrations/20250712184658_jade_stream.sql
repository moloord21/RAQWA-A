/*
  # Update QR codes table for advanced customization

  1. Changes
    - Add advanced_customization column to store complex QR designs
    - Add template_id column to reference saved templates
    - Update existing customization structure

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns for advanced customization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'qr_codes' AND column_name = 'advanced_customization'
  ) THEN
    ALTER TABLE qr_codes ADD COLUMN advanced_customization jsonb DEFAULT '{
      "pattern": {"id": "classic-squares", "name": "Classic Squares", "type": "squares"},
      "eyeShape": {"id": "square-square", "name": "Square in Square", "outerShape": "square", "innerShape": "square"},
      "frame": {"id": "none", "name": "No Frame", "type": "none"},
      "colors": {
        "foreground": "#000000",
        "background": "#FFFFFF", 
        "eyeColor": "#000000",
        "frameColor": "#333333"
      },
      "size": 300,
      "margin": 2,
      "errorCorrectionLevel": "H"
    }'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'qr_codes' AND column_name = 'template_id'
  ) THEN
    ALTER TABLE qr_codes ADD COLUMN template_id text;
  END IF;
END $$;

-- Update existing records to have the new structure
UPDATE qr_codes 
SET advanced_customization = jsonb_build_object(
  'pattern', jsonb_build_object(
    'id', 'classic-squares',
    'name', 'Classic Squares',
    'type', 'squares'
  ),
  'eyeShape', jsonb_build_object(
    'id', 'square-square',
    'name', 'Square in Square',
    'outerShape', 'square',
    'innerShape', 'square'
  ),
  'frame', jsonb_build_object(
    'id', 'none',
    'name', 'No Frame',
    'type', 'none'
  ),
  'colors', COALESCE(customization, '{"foreground": "#000000", "background": "#FFFFFF"}'::jsonb) || '{"eyeColor": "#000000", "frameColor": "#333333"}'::jsonb,
  'size', COALESCE((customization->>'size')::int, 300),
  'margin', COALESCE((customization->>'margin')::int, 2),
  'errorCorrectionLevel', 'H',
  'logoUrl', customization->>'logoUrl',
  'logoSize', COALESCE((customization->>'logoSize')::int, 40)
)
WHERE advanced_customization IS NULL;