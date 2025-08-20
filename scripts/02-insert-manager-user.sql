-- Insert the manager user with correct role
INSERT INTO users (email, full_name, role, department, phone, status) 
VALUES (
    'mngrit2.mptb@mp.gov.in',
    'IT Manager - MP Tourism Board',
    'manager',
    'Information Technology',
    '0755-2780600',
    'active'
) ON CONFLICT (email) DO UPDATE SET
    role = 'manager',
    full_name = 'IT Manager - MP Tourism Board',
    department = 'Information Technology',
    status = 'active',
    updated_at = NOW();

-- Also insert super admin user
INSERT INTO users (email, full_name, role, department, phone, status) 
VALUES (
    'admin@mptb.gov.in',
    'Super Administrator - MP Tourism Board',
    'super_admin',
    'Information Technology',
    '0755-2780600',
    'active'
) ON CONFLICT (email) DO UPDATE SET
    role = 'super_admin',
    full_name = 'Super Administrator - MP Tourism Board',
    department = 'Information Technology',
    status = 'active',
    updated_at = NOW();

-- Insert some sample inventory items
INSERT INTO inventory_items (item_name, category, brand, model, serial_number, purchase_date, purchase_price, warranty_expiry, condition, status, location, description) VALUES
('Dell Laptop', 'Computer', 'Dell', 'Inspiron 15 3000', 'DL001', '2023-01-15', 45000.00, '2026-01-15', 'good', 'available', 'IT Department', 'Standard office laptop'),
('HP Printer', 'Printer', 'HP', 'LaserJet Pro M404n', 'HP001', '2023-02-20', 15000.00, '2025-02-20', 'excellent', 'available', 'Admin Office', 'Black and white laser printer'),
('Cisco Router', 'Network', 'Cisco', 'ISR 4321', 'CS001', '2023-03-10', 85000.00, '2028-03-10', 'excellent', 'available', 'Server Room', 'Main office router');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('organization_name', 'Madhya Pradesh Tourism Board', 'Official organization name'),
('contact_email', 'info.mptb@mp.gov.in', 'Primary contact email'),
('contact_phone', '0755-2780600', 'Primary contact phone'),
('address', '6th Floor, Lily Trade Wing, Jahangirabad, Bhopal–462008', 'Official address');
