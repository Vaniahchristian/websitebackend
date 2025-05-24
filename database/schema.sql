-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table (matching frontend interface)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

-- Products table (matching frontend interface)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL
);

-- Requests table (matching frontend interface)
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    serviceType TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    paymentMethod TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'handled')),
    date TEXT NOT NULL
);

-- Site content table
CREATE TABLE site_content (
    section TEXT PRIMARY KEY,
    content JSONB NOT NULL
);

-- Insert sample services data
INSERT INTO services (name, description, image) VALUES
('Car Cleaning', 'Professional car detailing services to make your vehicle shine inside and out.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'),
('House Cleaning', 'Comprehensive home cleaning services for a spotless and healthy living environment.', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center'),
('Backyard Cleaning', 'Transform your outdoor space with our thorough backyard cleaning and maintenance.', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center'),
('Office Cleaning', 'Keep your workplace clean and professional with our specialized office cleaning.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center'),
('Window Cleaning', 'Crystal clear windows that let in more light and improve your property''s appearance.', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop&crop=center'),
('Carpet Cleaning', 'Deep cleaning for carpets to remove stains, allergens, and restore their appearance.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center');

-- Insert sample products data
INSERT INTO products (name, description, price, image, category) VALUES
('All-Purpose Cleaner', 'Effective cleaner for multiple surfaces.', 9.99, 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop&crop=center', 'Household'),
('Car Wash Shampoo', 'Gentle yet effective car cleaning solution.', 12.99, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=300&fit=crop&crop=center', 'Automotive'),
('Glass Cleaner', 'Streak-free formula for windows and mirrors.', 7.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center', 'Household'),
('Carpet Shampoo', 'Deep cleaning solution for carpets and upholstery.', 14.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center', 'Household'),
('Tire Shine Spray', 'Give your tires that showroom shine.', 11.99, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center', 'Automotive'),
('Microfiber Cloth Set', 'Pack of 5 premium microfiber cleaning cloths.', 15.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center', 'Accessories'),
('Disinfectant Spray', 'Kills 99.9% of germs and bacteria.', 8.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center', 'Household'),
('Leather Cleaner', 'Gentle cleaner for leather surfaces.', 16.99, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=300&fit=crop&crop=center', 'Automotive');

-- Insert sample requests data
INSERT INTO requests (name, phone, serviceType, description, location, paymentMethod, status, date) VALUES
('John Smith', '+1 (555) 123-4567', 'Car Cleaning', 'Need full detailing for my SUV before a road trip.', '123 Main St, Anytown', 'mtn', 'pending', '2023-05-15'),
('Sarah Johnson', '+1 (555) 987-6543', 'House Cleaning', 'Weekly cleaning service for a 3-bedroom house.', '456 Oak Ave, Somewhere', 'airtel', 'handled', '2023-05-14'),
('Michael Brown', '+1 (555) 456-7890', 'Backyard Cleaning', 'Need help cleaning up after a storm.', '789 Pine Rd, Nowhere', 'mtn', 'pending', '2023-05-13'),
('Emily Davis', '+1 (555) 234-5678', 'Window Cleaning', 'Need all windows cleaned in a two-story house.', '101 Elm St, Anytown', 'airtel', 'pending', '2023-05-12'),
('David Wilson', '+1 (555) 876-5432', 'Car Cleaning', 'Interior cleaning for a sedan.', '202 Maple Dr, Somewhere', 'mtn', 'handled', '2023-05-11');

-- Insert site content
INSERT INTO site_content (section, content) VALUES
('hero', '{
  "title": "Sparkle Starts Here",
  "subtitle": "Book car, home & backyard cleaning services or buy trusted cleaning products."
}'::jsonb),
('about', '{
  "title": "About FreshShine",
  "content": "FreshShine Cleaning Services was founded with a simple mission: to provide exceptional cleaning services that make your spaces shine. We believe that a clean environment contributes to a healthier, happier life.\n\nOur team of dedicated professionals is committed to delivering top-quality cleaning services for cars, homes, and backyards. We use eco-friendly products and advanced techniques to ensure the best results.\n\nWhat sets us apart is our attention to detail and our commitment to customer satisfaction. We''re not just cleaning; we''re creating spaces that inspire and rejuvenate."
}'::jsonb),
('howItWorks', '{
  "title": "How It Works",
  "subtitle": "Our simple three-step process makes it easy to get your spaces sparkling clean.",
  "steps": [
    {
      "title": "Choose Service",
      "description": "Select from our range of cleaning services for your car, home, or backyard."
    },
    {
      "title": "Negotiate",
      "description": "Fill out our negotiation form to discuss your specific needs and pricing."
    },
    {
      "title": "Get Cleaned",
      "description": "Our professional team will arrive at the scheduled time and deliver exceptional service."
    }
  ]
}'::jsonb),
('footer', '{
  "businessHours": {
    "weekdays": "Monday - Friday: 8:00 AM - 6:00 PM",
    "saturday": "Saturday: 9:00 AM - 5:00 PM",
    "sunday": "Sunday: Closed"
  },
  "contact": {
    "address": "123 Cleaning Street, Sparkle City",
    "phone": "+1 (555) 123-4567",
    "email": "info@freshshine.com"
  }
}'::jsonb);
