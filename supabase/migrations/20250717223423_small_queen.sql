/*
  # Add Advanced QR Code Customization Support

  1. Database Changes
    - Update qr_codes table to support advanced customization options
    - Add template support with predefined styles
    - Add frame, dot style, and eye style options
    - Maintain backward compatibility with existing customization

  2. New Features
    - Template selection system
    - Frame styles (none, square, rounded, circle)
    - Dot patterns (square, circle, rounded, diamond)
    - Inner and outer eye styles
    - Advanced color controls
*/

-- Update the advanced_customization column to support new features
DO $$
BEGIN
  -- Update default advanced_customization structure
  UPDATE qr_codes 
  SET advanced_customization = jsonb_build_object(
    'size', 300,
    'margin', 2,
    'errorCorrectionLevel', 'H',
    'colors', jsonb_build_object(
      'background', '#FFFFFF',
      'foreground', '#000000',
      'eyeColor', '#000000',
      'frameColor', '#333333'
    ),
    'frame', jsonb_build_object(
      'id', 'none',
      'name', 'No Frame',
      'type', 'none'
    ),
    'bodyShape', jsonb_build_object(
      'id', 'square',
      'name', 'Square',
      'type', 'square'
    ),
    'eyeFrameShape', jsonb_build_object(
      'id', 'square',
      'name', 'Square',
      'type', 'square'
    ),
    'eyeBallShape', jsonb_build_object(
      'id', 'square',
      'name', 'Square',
      'type', 'square'
    )
  )
  WHERE advanced_customization IS NULL OR advanced_customization = '{}';
END $$;

-- Add template_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'qr_codes' AND column_name = 'template_id'
  ) THEN
    ALTER TABLE qr_codes ADD COLUMN template_id text;
  END IF;
END $$;

-- Create index for better performance on template queries
CREATE INDEX IF NOT EXISTS idx_qr_codes_template_id ON qr_codes(template_id);

-- Create indexes for advanced customization queries
CREATE INDEX IF NOT EXISTS idx_qr_codes_advanced_customization ON qr_codes USING gin(advanced_customization);
CREATE INDEX IF NOT EXISTS idx_qr_codes_body_shape ON qr_codes USING gin((advanced_customization->'bodyShape'));
CREATE INDEX IF NOT EXISTS idx_qr_codes_eye_frame_shape ON qr_codes USING gin((advanced_customization->'eyeFrameShape'));
CREATE INDEX IF NOT EXISTS idx_qr_codes_eye_ball_shape ON qr_codes USING gin((advanced_customization->'eyeBallShape'));