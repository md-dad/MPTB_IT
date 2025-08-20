-- MP Tourism Board IT Inventory Management System
-- Sample Data Insertion Script

-- Insert default categories
INSERT INTO categories (name, description) VALUES
('Computers', 'Desktop computers, laptops, and workstations'),
('Networking', 'Routers, switches, access points, and network equipment'),
('Peripherals', 'Monitors, keyboards, mice, and other accessories'),
('Mobile Devices', 'Smartphones, tablets, and mobile accessories'),
('Printers', 'Printers, scanners, and printing equipment'),
('Storage', 'Hard drives, SSDs, and storage devices'),
('Software', 'Software licenses and applications'),
('Audio/Video', 'Cameras, microphones, speakers, and AV equipment');

-- Note: Users will be created through Supabase auth and then linked to this table
-- Sample users data will be inserted after auth users are created

-- Insert sample staff members
INSERT INTO staff_members (employee_id, name, department, designation, email, phone) VALUES
('EMP001', 'Rajesh Kumar', 'Administration', 'Assistant Director', 'rajesh.kumar@mptourism.gov.in', '9876543210'),
('EMP002', 'Priya Sharma', 'Marketing', 'Marketing Officer', 'priya.sharma@mptourism.gov.in', '9876543211'),
('EMP003', 'Amit Patel', 'Finance', 'Accounts Officer', 'amit.patel@mptourism.gov.in', '9876543212'),
('EMP004', 'Sunita Verma', 'HR', 'HR Executive', 'sunita.verma@mptourism.gov.in', '9876543213'),
('EMP005', 'Vikram Singh', 'Operations', 'Operations Manager', 'vikram.singh@mptourism.gov.in', '9876543214');

-- Insert sample inventory items
INSERT INTO inventory_items (item_name, category_id, brand, model, serial_number, asset_tag, purchase_date, purchase_cost, warranty_expiry, supplier, location, status, condition, specifications) VALUES
('Dell OptiPlex Desktop', 1, 'Dell', 'OptiPlex 7090', 'DL001234567', 'MPTB-001', '2023-01-15', 45000.00, '2026-01-15', 'Dell India', 'Admin Office - Floor 6', 'available', 'excellent', 'Intel i5, 8GB RAM, 256GB SSD'),
('HP LaserJet Printer', 5, 'HP', 'LaserJet Pro M404n', 'HP987654321', 'MPTB-002', '2023-02-20', 15000.00, '2025-02-20', 'HP India', 'Marketing Department', 'issued', 'good', 'Monochrome, Network enabled'),
('Cisco Router', 2, 'Cisco', 'ISR 4331', 'CS123456789', 'MPTB-003', '2023-03-10', 85000.00, '2028-03-10', 'Cisco Systems', 'Server Room', 'available', 'excellent', '4-port Gigabit Ethernet'),
('Samsung Monitor', 3, 'Samsung', 'F24T450FQU', 'SM246810121', 'MPTB-004', '2023-04-05', 12000.00, '2026-04-05', 'Samsung India', 'Finance Department', 'available', 'good', '24-inch Full HD IPS'),
('Lenovo ThinkPad', 1, 'Lenovo', 'ThinkPad E14', 'LN135792468', 'MPTB-005', '2023-05-12', 55000.00, '2026-05-12', 'Lenovo India', 'HR Department', 'issued', 'excellent', 'Intel i7, 16GB RAM, 512GB SSD');

-- Insert sample issuances
INSERT INTO issuances (item_id, staff_id, issued_by, issue_date, expected_return_date, purpose, status) VALUES
(2, 2, 2, '2023-06-01', '2024-06-01', 'Marketing campaign printing requirements', 'active'),
(5, 4, 2, '2023-07-15', '2024-07-15', 'HR management and remote work', 'active');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description, updated_by) VALUES
('organization_name', 'Madhya Pradesh Tourism Board', 'Official organization name', 1),
('organization_address', '6th Floor, Lily Trade Wing, Jahangirabad, Bhopal–462008', 'Official address', 1),
('contact_email', 'info.mptb@mp.gov.in', 'Primary contact email', 1),
('contact_phone', '0755-2780600', 'Primary contact phone', 1),
('default_warranty_period', '36', 'Default warranty period in months', 1),
('low_stock_threshold', '5', 'Minimum stock level for alerts', 1);

-- Insert sample CMS content
INSERT INTO cms_content (title, content_type, content, status, author_id) VALUES
('IT Equipment Usage Policy', 'policy', 'All IT equipment issued by MP Tourism Board must be used solely for official purposes. Users are responsible for the proper care and maintenance of assigned equipment.', 'published', 1),
('Equipment Return Procedure', 'procedure', 'When returning equipment: 1. Ensure all personal data is removed 2. Clean the equipment 3. Include all accessories 4. Report any damages immediately', 'published', 1),
('System Maintenance Notice', 'announcement', 'The IT inventory system will undergo maintenance on the first Sunday of every month from 2:00 AM to 4:00 AM.', 'published', 1);

-- Insert sample notifications
INSERT INTO notifications (title, message, type, target_role, is_active, created_by, expires_at) VALUES
('Welcome to IT Inventory System', 'Welcome to the MP Tourism Board IT Inventory Management System. Please familiarize yourself with the system policies.', 'info', 'all', true, 1, '2024-12-31 23:59:59'),
('Low Stock Alert', 'Several items are running low in stock. Please review and reorder as necessary.', 'warning', 'manager_it', true, 1, '2024-06-30 23:59:59');
