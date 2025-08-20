-- MP Tourism Board IT Inventory Management System
-- Database Schema Creation Script

-- Users table for role management (linked to Supabase auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL, -- Changed from 'name' to 'full_name' to match auth code
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'manager')), -- Changed 'manager_it' to 'manager' to match auth code
    department VARCHAR(255),
    phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')), -- Added status field with proper check constraint
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table for inventory classification
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255), -- Simplified to VARCHAR instead of foreign key for easier management
    brand VARCHAR(255),
    model VARCHAR(255),
    serial_number VARCHAR(255) UNIQUE,
    asset_tag VARCHAR(255) UNIQUE,
    purchase_date DATE,
    purchase_price DECIMAL(10,2), -- Renamed from purchase_cost to purchase_price
    warranty_expiry DATE,
    supplier VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'issued', 'maintenance', 'retired')),
    condition VARCHAR(50) DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
    description TEXT, -- Renamed from specifications to description
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff members table for issuance tracking
CREATE TABLE IF NOT EXISTS staff_members (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    designation VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issuances table for tracking equipment assignments
CREATE TABLE IF NOT EXISTS issuances (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES inventory_items(id),
    staff_id INTEGER REFERENCES staff_members(id),
    issued_by INTEGER REFERENCES users(id),
    issue_date DATE NOT NULL,
    expected_return_date DATE,
    actual_return_date DATE,
    return_condition VARCHAR(50) CHECK (return_condition IN ('excellent', 'good', 'fair', 'poor', 'damaged')),
    purpose TEXT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'returned', 'overdue')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS content table for managing system content
CREATE TABLE IF NOT EXISTS cms_content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('policy', 'procedure', 'announcement', 'page')),
    content TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings table for configuration
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table for system announcements
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
    target_role VARCHAR(50) CHECK (target_role IN ('all', 'super_admin', 'manager_it')),
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_items_status ON inventory_items(status);
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_issuances_status ON issuances(status);
CREATE INDEX IF NOT EXISTS idx_issuances_item ON issuances(item_id);
CREATE INDEX IF NOT EXISTS idx_issuances_staff ON issuances(staff_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_cms_content_type ON cms_content(content_type);
