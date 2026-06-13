USE revive_market;

-- Branches (Yaoundé only)
INSERT INTO branches (id, name, address) VALUES
(1, 'Yaoundé', 'Bastos, Rue 1.234');

-- Users (password_hash is bcrypt of "password123" for all)
INSERT INTO users (id, name, email, phone, password_hash, role, id_verified, branch_id) VALUES
(1, 'Jean Mbarga',     'jean.mbarga@example.cm',     '+237 690 123 456', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   TRUE,  NULL),
(2, 'Aïssa Foka',      'aissa.foka@example.cm',      '+237 691 234 567', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(3, 'Paul Nkomo',      'paul.nkomo@example.cm',      '+237 692 345 678', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(4, 'Marie Tchamba',   'marie.tchamba@example.cm',   '+237 693 456 789', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(5, 'Ousmane Diallo',  'ousmane.diallo@example.cm',  '+237 694 567 890', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(6, 'Cynthia Eyenga',  'cynthia.eyenga@example.cm',  '+237 695 678 901', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(7, 'Brice Talla',     'brice.talla@example.cm',     '+237 696 789 012', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'customer',   FALSE, NULL),
(8, 'Admin Revive',    'admin@revivemarket.cm',      '+237 690 000 001', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'admin',      TRUE,  1),
(9, 'Eric Tabi',       'eric.tabi@revivemarket.cm',  '+237 690 000 002', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'technician', TRUE,  1),
(10, 'Sandrine Mballa', 'sandrine.mballa@revivemarket.cm', '+237 690 000 003', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'technician', TRUE,  1),
(11, 'Yannick Foko',   'yannick.foko@revivemarket.cm', '+237 690 000 004', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'technician', TRUE,  1),
(12, 'Patrick Owono',  'patrick.owono@revivemarket.cm', '+237 690 000 005', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'technician', TRUE,  1),
(13, 'Linda Ngo',      'linda.ngo@revivemarket.cm',  '+237 690 000 006', '$2a$10$FN5V5yLDEdGrlSVpanKnPei.9UHv/hdNQuu257SiZ8CCVzLTJKqVu', 'technician', TRUE,  1);

-- Devices (all Yaoundé)
INSERT INTO devices (id, tracking_id, name, brand, category, grade, price, branch_id, status, imei, specs,   `condition`, image_url) VALUES
(1,  'RM-YDE-00123', 'iPhone 11 64GB',           'Apple',    'Phones',   'A', 185000, 1, 'In Stock', '356789102345678',
  '["6.1 in Liquid Retina","A13 Bionic","64GB / 4GB RAM","Battery 89%"]',
  'Minimal scratches on frame, screen pristine.', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=70'),
(2,  'RM-YDE-00088', 'Samsung Galaxy A14',        'Samsung',  'Phones',   'B', 78000,  1, 'In Stock', '352145789632147',
  '["6.6 in PLS LCD","Helio G80","128GB / 4GB"]',
  'Light wear on back panel.', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=70'),
(3,  'RM-YDE-00041', 'Tecno Camon 20',            'Tecno',    'Phones',   'B', 95000,  1, 'In Stock', '356123789654123',
  '["6.67 in AMOLED","Helio G85","256GB / 8GB"]',
  'Excellent screen, minor edge wear.', 'https://images.unsplash.com/photo-1616348436168-de43ad0a1790?auto=format&fit=crop&w=800&q=70'),
(4,  'RM-YDE-00131', 'iPhone 12 Pro 128GB',       'Apple',    'Phones',   'A', 285000, 1, 'In Stock', '357412589632147',
  '["6.1 in Super Retina XDR","A14 Bionic","128GB / 6GB","Battery 91%"]',
  'Like new, original box included.', 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&w=800&q=70'),
(5,  'RM-YDE-00102', 'HP EliteBook 840 G6',       'HP',       'Laptops',  'B', 235000, 1, 'In Stock', 'HP840G6-7732',
  '["14 in FHD","Intel i5-8265U","16GB / 256GB SSD"]',
  'Keyboard slightly worn, screen clean.', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=70'),
(6,  'RM-YDE-00145', 'Lenovo ThinkPad T480',      'Lenovo',   'Laptops',  'A', 280000, 1, 'In Stock', 'TP-T480-9921',
  '["14 in FHD IPS","Intel i7-8650U","16GB / 512GB SSD"]',
  'Refurbished, new battery installed.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=70'),
(7,  'RM-YDE-00052', 'Dell Latitude 7490',        'Dell',     'Laptops',  'C', 165000, 1, 'In Stock', 'DL7490-3321',
  '["14 in FHD","Intel i5-8350U","8GB / 256GB SSD"]',
  'Visible wear, fully functional.', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=70'),
(8,  'RM-YDE-00115', 'Samsung Galaxy Tab A8',     'Samsung',  'Tablets',  'A', 135000, 1, 'In Stock', 'GT-A8-77129',
  '["10.5 in LCD","Unisoc T618","64GB / 4GB"]',
  'Mint condition with cover.', 'https://images.unsplash.com/photo-1546868871-af0de0ae72f5?auto=format&fit=crop&w=800&q=70'),
(9,  'RM-YDE-00150', 'iPad 9th Gen 64GB',         'Apple',    'Tablets',  'B', 195000, 1, 'Sold', 'IPAD9-44218',
  '["10.2 in Retina","A13 Bionic","64GB"]',
  'Light scratches on back.', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=70'),
(10, 'RM-YDE-00121', 'PlayStation 4 Slim 1TB',     'Sony',     'Consoles', 'B', 145000, 1, 'In Stock', 'PS4S-99213',
  '["1TB HDD","2 Controllers","3 Games included"]',
  'Working perfectly, slight controller wear.', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=70'),
(11, 'RM-YDE-00158', 'PlayStation 4 Pro 1TB',     'Sony',     'Consoles', 'A', 210000, 1, 'In Stock', 'PS4P-66128',
  '["1TB HDD","4K HDR","2 Controllers"]',
  'Excellent condition, original box.', 'https://images.unsplash.com/photo-1605901309584-4c8c5a9e7650?auto=format&fit=crop&w=800&q=70'),
(12, 'RM-YDE-00059', 'Xiaomi Redmi Note 11',      'Xiaomi',   'Phones',   'A', 110000, 1, 'In Stock', 'RN11-55432',
  '["6.43 in AMOLED","Snapdragon 680","128GB / 6GB"]',
  'Like new with screen protector.', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=70'),
(13, 'RM-YDE-00128', 'MacBook Air M1 256GB',      'Apple',    'Laptops',  'A', 350000, 1, 'In Stock', 'MBA-M1-22113',
  '["13.3 in Retina","Apple M1","8GB / 256GB SSD"]',
  'Mint, battery cycles <100.', 'https://images.unsplash.com/photo-1611186871348-b1f696febbb3?auto=format&fit=crop&w=800&q=70'),
(14, 'RM-YDE-00162', 'Infinix Hot 30',            'Infinix',  'Phones',   'C', 45000,  1, 'In Stock', 'INF30-77721',
  '["6.78 in IPS","Helio G88","128GB / 4GB"]',
  'Scratches on screen edge.', 'https://images.unsplash.com/photo-1598965402089-897d52eec5b8?auto=format&fit=crop&w=800&q=70'),
(15, 'RM-YDE-00063', 'Lenovo Tab M10',            'Lenovo',   'Tablets',  'B', 88000,  1, 'In Stock', 'LT-M10-33287',
  '["10.1 in HD","Helio P22T","32GB / 3GB"]',
  'Good shape, minor wear.', 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=70');

-- Orders
INSERT INTO orders (id, user_id, device_id, tracking_id, price, city, address, payment_method, status, created_at) VALUES
(1, 1, 1,  'RM-YDE-00123', 185000, 'Yaoundé',   'Bastos, Rue 1.234',    'MTN MoMo',      'Out for Delivery', '2026-06-09'),
(2, 2, 2,  'RM-YDE-00088', 78000,  'Yaoundé',   'Bastos, Rue 1.234',    'Orange Money',  'Delivered',        '2026-06-05'),
(3, 3, 5,  'RM-YDE-00102', 235000, 'Yaoundé',   'Bastos, Rue 1.234',    'MTN MoMo',      'Processing',       '2026-06-11'),
(4, 4, 9,  'RM-YDE-00150', 195000, 'Yaoundé',   'Bastos, Rue 1.234',    'Pay on Delivery','Delivered',       '2026-05-29'),
(5, 5, 3,  'RM-YDE-00041', 95000,  'Yaoundé',   'Bastos, Rue 1.234',    'Orange Money',  'Processing',       '2026-06-10'),
(6, 6, 10, 'RM-YDE-00121', 145000, 'Yaoundé',   'Bastos, Rue 1.234',    'MTN MoMo',      'Out for Delivery', '2026-06-08'),
(7, 7, 13, 'RM-YDE-00128', 350000, 'Yaoundé',   'Bastos, Rue 1.234',    'MTN MoMo',      'Delivered',        '2026-05-22');

-- Sell Requests
INSERT INTO sell_requests (id, user_id, device_name, category, imei, `condition`, description, branch_id, imei_status, `status`, offer, grade, created_at) VALUES
(1, 1, 'iPhone X 64GB',             'Phones',   '356789102345111', 'good',    'Working phone, minor scratches on screen.',          1, 'Verified', 'Offer Made',  95000,  'B', '2026-06-08'),
(2, 2, 'Tecno Spark 10',            'Phones',   '356123789654999', 'fair',    'Crack on back glass but screen is fine.',            1, 'Verified', 'Under Review', NULL,  NULL, '2026-06-10'),
(3, 6, 'iPhone 13 128GB',           'Phones',   '357412589632000', 'excellent', NULL,                                                 1, 'Flagged',  'Submitted',    NULL,  NULL, '2026-06-11'),
(4, 4, 'Lenovo IdeaPad 3',          'Laptops',  'LI3-77821',       'good',    'Good condition, battery lasts about 3 hours.',       1, 'Verified', 'Accepted',    145000,'B',  '2026-06-02'),
(5, 5, 'Samsung Galaxy Tab A7',     'Tablets',  'GT-A7-21345',     'good',    NULL,                                                 1, 'Verified', 'Paid',        65000,  'B',  '2026-05-25'),
(6, 6, 'Xbox One S',                'Consoles', 'XB1S-99001',       'fair',    'Works fine, controller has drift.',                  1, 'Pending',  'Submitted',    NULL,  NULL, '2026-06-11');

-- Repair Jobs
INSERT INTO repair_jobs (id, user_id, device_name, category, issue, branch_id, technician_id, status, delivery_method, quote, quote_approved, priority, created_at) VALUES
(1, 3, 'iPhone 11',           'Phones',   'Cracked screen',                    1,  9,  'In Repair',      'dropoff', 45000, TRUE,  'High',   '2026-06-09'),
(2, 4, 'HP Pavilion 15',      'Laptops',  'Won''t power on',                   1,  10, 'Diagnosing',     'dropoff', NULL,  FALSE, 'Normal', '2026-06-10'),
(3, 5, 'Samsung Galaxy A52',  'Phones',   'Battery drains fast',              1,  11, 'Awaiting Parts', 'dropoff', 22000, TRUE,  'Normal', '2026-06-07'),
(4, 2, 'PS4 Slim',            'Consoles','HDMI port broken',                  1,  10, 'Ready',          'dropoff', 35000, TRUE,  'Normal', '2026-06-04'),
(5, 7, 'MacBook Pro 2017',    'Laptops',  'Keyboard not responsive',          1,  10, 'Received',       'pickup',  NULL,  FALSE, 'Low',    '2026-06-11'),
(6, 6, 'iPad Air 2',          'Tablets',  'Touch unresponsive on top',        1,  9,  'Completed',      'dropoff', 28000, TRUE,  'Normal', '2026-05-30');

-- Transactions
INSERT INTO transactions (id, order_id, user_id, amount, method, escrow, created_at) VALUES
(1, 1, 1, 185000, 'MTN MoMo',      'Held',    '2026-06-09'),
(2, 2, 2, 78000,  'Orange Money',  'Released','2026-06-05'),
(3, 3, 3, 235000, 'MTN MoMo',      'Held',    '2026-06-11'),
(4, 4, 4, 195000, 'Pay on Delivery','N/A',    '2026-05-29'),
(5, 5, 5, 95000,  'Orange Money',  'Held',    '2026-06-10'),
(6, 6, 6, 145000, 'MTN MoMo',      'Held',    '2026-06-08'),
(7, 7, 7, 350000, 'MTN MoMo',      'Released','2026-05-22');

-- Part Requests
INSERT INTO part_requests (id, repair_job_id, part_name, quantity, status) VALUES
(1, 1, 'iPhone 11 LCD assembly', 1, 'Fulfilled'),
(2, 3, 'Samsung A52 battery',    2, 'Pending'),
(3, 4, 'PS4 HDMI port',          1, 'Released'),
(4, 5, 'MacBook 2017 keyboard',  1, 'Pending');

-- Feedback
INSERT INTO feedback (id, repair_job_id, customer_id, rating, message) VALUES
(1, 4, 2, 5, 'Fixed my PS4 HDMI in 2 days — perfect work!'),
(2, 1, 3, 5, 'Very professional and clear about pricing.'),
(3, 6, 6, 4, 'Good repair quality, slightly longer than expected.');
