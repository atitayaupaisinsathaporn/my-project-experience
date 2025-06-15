CREATE TABLE item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(255),
  quantity INT
);

INSERT INTO item (name, category, quantity) VALUES 
('Tent', 'Camping', 3),
('Lantern', 'Camping', 5),
('CS Book', 'Book', 4),
('Mop', 'Cleaning', 2),
('Vacuum', 'Cleaning', 3),
('Shovel', 'Camping', 1),
('Hammer', 'Camping', 2),
('Screwdriver', 'Tools', 4),
('Wrench', 'Tools', 3),
('Drill', 'Tools', 2),
('Saw', 'Tools', 1),
('Laptop Charger', 'Electronics', 5),
('Phone Charger', 'Electronics', 4),
('Tablet Charger', 'Electronics', 3),
('Monitor', 'Electronics', 2),
('Laptop', 'Electronics', 1);
