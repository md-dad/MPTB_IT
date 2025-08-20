-- MP Tourism Board IT Inventory Management System
-- Database Views for Reporting and Analytics

-- View for inventory summary with category information
CREATE OR REPLACE VIEW inventory_summary AS
SELECT 
    i.id,
    i.item_name,
    c.name as category_name,
    i.brand,
    i.model,
    i.serial_number,
    i.asset_tag,
    i.status,
    i.condition,
    i.location,
    i.purchase_date,
    i.warranty_expiry,
    CASE 
        WHEN i.warranty_expiry < CURRENT_DATE THEN 'Expired'
        WHEN i.warranty_expiry < CURRENT_DATE + INTERVAL '30 days' THEN 'Expiring Soon'
        ELSE 'Active'
    END as warranty_status
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id;

-- View for active issuances with staff and item details
CREATE OR REPLACE VIEW active_issuances AS
SELECT 
    iss.id,
    i.item_name,
    i.asset_tag,
    s.name as staff_name,
    s.employee_id,
    s.department,
    iss.issue_date,
    iss.expected_return_date,
    iss.purpose,
    CASE 
        WHEN iss.expected_return_date < CURRENT_DATE THEN 'Overdue'
        WHEN iss.expected_return_date < CURRENT_DATE + INTERVAL '7 days' THEN 'Due Soon'
        ELSE 'Active'
    END as return_status,
    u.name as issued_by_name
FROM issuances iss
JOIN inventory_items i ON iss.item_id = i.id
JOIN staff_members s ON iss.staff_id = s.id
JOIN users u ON iss.issued_by = u.id
WHERE iss.status = 'active';

-- View for inventory statistics by category
CREATE OR REPLACE VIEW inventory_stats_by_category AS
SELECT 
    c.name as category_name,
    COUNT(i.id) as total_items,
    COUNT(CASE WHEN i.status = 'available' THEN 1 END) as available_items,
    COUNT(CASE WHEN i.status = 'issued' THEN 1 END) as issued_items,
    COUNT(CASE WHEN i.status = 'maintenance' THEN 1 END) as maintenance_items,
    COUNT(CASE WHEN i.status = 'retired' THEN 1 END) as retired_items,
    ROUND(AVG(i.purchase_cost), 2) as avg_cost
FROM categories c
LEFT JOIN inventory_items i ON c.id = i.category_id
GROUP BY c.id, c.name
ORDER BY total_items DESC;

-- View for overdue returns
CREATE OR REPLACE VIEW overdue_returns AS
SELECT 
    iss.id,
    i.item_name,
    i.asset_tag,
    s.name as staff_name,
    s.employee_id,
    s.department,
    s.phone,
    iss.issue_date,
    iss.expected_return_date,
    CURRENT_DATE - iss.expected_return_date as days_overdue,
    iss.purpose
FROM issuances iss
JOIN inventory_items i ON iss.item_id = i.id
JOIN staff_members s ON iss.staff_id = s.id
WHERE iss.status = 'active' 
AND iss.expected_return_date < CURRENT_DATE
ORDER BY days_overdue DESC;

-- View for warranty expiry alerts
CREATE OR REPLACE VIEW warranty_alerts AS
SELECT 
    i.id,
    i.item_name,
    i.brand,
    i.model,
    i.asset_tag,
    i.warranty_expiry,
    i.warranty_expiry - CURRENT_DATE as days_until_expiry,
    i.location,
    i.purchase_cost
FROM inventory_items i
WHERE i.warranty_expiry IS NOT NULL
AND i.warranty_expiry BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '90 days'
AND i.status != 'retired'
ORDER BY i.warranty_expiry ASC;
