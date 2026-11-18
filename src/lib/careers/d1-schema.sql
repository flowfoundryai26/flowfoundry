-- FlowFoundry AI Solutions - Cloudflare D1 Schema for Careers & Internships
-- Execute via Cloudflare Dashboard (Workers & Pages > D1 > your-database > Console)
-- or via Wrangler CLI: npx wrangler d1 execute <DATABASE_NAME> --file=./src/lib/careers/d1-schema.sql

CREATE TABLE IF NOT EXISTS careers_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  college TEXT NOT NULL,
  degree TEXT NOT NULL,
  current_year TEXT NOT NULL,
  graduation_year TEXT,
  track_id TEXT NOT NULL,
  track_title TEXT NOT NULL,
  technical_skills TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_original_name TEXT NOT NULL,
  resume_storage_filename TEXT NOT NULL,
  resume_mime_type TEXT NOT NULL,
  resume_size_bytes INTEGER NOT NULL,
  resume_stored_path TEXT NOT NULL,
  resume_uploaded_at TEXT NOT NULL,
  preferred_start_date TEXT NOT NULL,
  weekly_availability TEXT NOT NULL,
  can_commit_three_months INTEGER NOT NULL DEFAULT 1,
  motivation_statement TEXT NOT NULL,
  unpaid_acknowledgement INTEGER NOT NULL DEFAULT 1,
  no_employment_guarantee INTEGER NOT NULL DEFAULT 1,
  privacy_consent INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_careers_email ON careers_applications(email);
CREATE INDEX IF NOT EXISTS idx_careers_track ON careers_applications(track_id);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON careers_applications(created_at);
