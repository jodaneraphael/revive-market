CREATE DATABASE IF NOT EXISTS revive_market
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE revive_market;

-- 1. branches
CREATE TABLE IF NOT EXISTS branches (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL UNIQUE,
  address    VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. users (unified: customers + admins + technicians)
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(100) UNIQUE,
  phone         VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('customer','admin','technician') NOT NULL DEFAULT 'customer',
  id_verified   BOOLEAN DEFAULT FALSE,
  branch_id     INT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branches(id)
) ENGINE=InnoDB;

-- 3. devices (inventory)
CREATE TABLE IF NOT EXISTS devices (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  tracking_id VARCHAR(20) NOT NULL UNIQUE,
  name        VARCHAR(150) NOT NULL,
  brand       VARCHAR(50),
  category    ENUM('Phones','Laptops','Tablets','Consoles') NOT NULL,
  grade       ENUM('A','B','C') NOT NULL,
  price       INT NOT NULL,
  branch_id   INT NOT NULL,
  status      ENUM('In Stock','Sold','In Repair','Reserved') DEFAULT 'In Stock',
  imei        VARCHAR(30),
  specs       LONGTEXT,
  description TEXT,
  `condition`   TEXT,
  image_url   VARCHAR(500),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  INDEX idx_devices_status (`status`),
  INDEX idx_devices_category (category),
  INDEX idx_devices_branch_status (branch_id, `status`)
) ENGINE=InnoDB;

-- 4. orders
CREATE TABLE IF NOT EXISTS orders (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  device_id      INT NOT NULL,
  tracking_id    VARCHAR(20) NOT NULL,
  price          INT NOT NULL,
  delivery_fee   INT DEFAULT 2000,
  total          INT AS (price + delivery_fee) VIRTUAL,
  city           VARCHAR(50),
  address        VARCHAR(255),
  payment_method ENUM('MTN MoMo','Orange Money','Pay on Delivery') NOT NULL,
  status         ENUM('Processing','Out for Delivery','Delivered','Cancelled') DEFAULT 'Processing',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (device_id) REFERENCES devices(id),
  INDEX idx_orders_user (user_id),
  INDEX idx_orders_status (`status`)
) ENGINE=InnoDB;

-- 5. sell_requests
CREATE TABLE IF NOT EXISTS sell_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  device_name VARCHAR(150) NOT NULL,
  category    ENUM('Phones','Laptops','Tablets','Consoles') NOT NULL,
  imei        VARCHAR(30),
  `condition` ENUM('excellent','good','fair','broken'),
  description TEXT,
  photo_urls  TEXT,
  id_doc_url  VARCHAR(500),
  branch_id   INT,
  imei_status ENUM('Pending','Verified','Flagged') DEFAULT 'Pending',
  status      ENUM('Submitted','Under Review','Offer Made','Accepted','Declined','Paid') DEFAULT 'Submitted',
  offer       INT,
  grade       ENUM('A','B','C'),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  INDEX idx_sell_requests_status (`status`),
  INDEX idx_sell_requests_branch (branch_id)
) ENGINE=InnoDB;

-- 6. repair_jobs
CREATE TABLE IF NOT EXISTS repair_jobs (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL,
  device_name     VARCHAR(150) NOT NULL,
  category        ENUM('Phones','Laptops','Tablets','Consoles'),
  issue           TEXT,
  branch_id       INT NOT NULL,
  technician_id   INT,
  status          ENUM('Received','Diagnosing','Awaiting Parts','In Repair','Ready','Completed') DEFAULT 'Received',
  delivery_method ENUM('dropoff','pickup') DEFAULT 'dropoff',
  quote           INT,
  quote_approved  BOOLEAN DEFAULT FALSE,
  priority        ENUM('Low','Normal','High') DEFAULT 'Normal',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (technician_id) REFERENCES users(id),
  INDEX idx_repair_technician (technician_id),
  INDEX idx_repair_status (`status`)
) ENGINE=InnoDB;

-- 7. transactions (payments + escrow)
CREATE TABLE IF NOT EXISTS transactions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   INT NOT NULL,
  user_id    INT NOT NULL,
  amount     INT NOT NULL,
  method     ENUM('MTN MoMo','Orange Money','Pay on Delivery') NOT NULL,
  escrow     ENUM('Held','Released','N/A') DEFAULT 'Held',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_transactions_order (order_id)
) ENGINE=InnoDB;

-- 8. part_requests
CREATE TABLE IF NOT EXISTS part_requests (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  repair_job_id INT NOT NULL,
  part_name     VARCHAR(200) NOT NULL,
  quantity      INT DEFAULT 1,
  status        ENUM('Pending','Fulfilled','Released') DEFAULT 'Pending',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (repair_job_id) REFERENCES repair_jobs(id),
  INDEX idx_part_requests_job (repair_job_id)
) ENGINE=InnoDB;

-- 10. notifications
CREATE TABLE IF NOT EXISTS notifications (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  title         VARCHAR(255) NOT NULL,
  message       TEXT,
  type          ENUM('order','sell','repair','general') DEFAULT 'general',
  reference_id  INT,
  reference_type VARCHAR(50),
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_notifications_user (user_id, is_read)
) ENGINE=InnoDB;

-- 9. feedback
CREATE TABLE IF NOT EXISTS feedback (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  repair_job_id INT NOT NULL,
  customer_id   INT NOT NULL,
  rating        TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message       TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (repair_job_id) REFERENCES repair_jobs(id),
  FOREIGN KEY (customer_id) REFERENCES users(id)
) ENGINE=InnoDB;
