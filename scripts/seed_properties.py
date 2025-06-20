"""
Seed the database with sample Property records for development/demo purposes.

Usage:
    python scripts/seed_properties.py

Ensure your DATABASE_URL environment variable is set and dependencies are installed.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.models.property import Property, PropertyTypeEnum
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Create five sample properties
properties = [
    Property(
        address="123 Main St",
        suburb="Sampleville",
        property_type=PropertyTypeEnum.House,
        bedrooms=3,
        bathrooms=2,
        car_spaces=1,
        square_meters=120,
        price_min=500000,
        price_max=550000,
        annual_rent_min=20000,
        annual_rent_max=22000,
        expected_price=525000,
        expected_rental_income=21000,
        strata_fees=None,
        council_rates=1500,
        water_rates=800,
        home_insurance=600,
        landlord_insurance=300,
        image_url=None,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Property(
        address="456 Oak Ave",
        suburb="Greentown",
        property_type=PropertyTypeEnum.Townhouse,
        bedrooms=2,
        bathrooms=1,
        car_spaces=1,
        square_meters=90,
        price_min=400000,
        price_max=420000,
        annual_rent_min=18000,
        annual_rent_max=19000,
        expected_price=410000,
        expected_rental_income=18500,
        strata_fees=1200,
        council_rates=1300,
        water_rates=700,
        home_insurance=500,
        landlord_insurance=250,
        image_url=None,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Property(
        address="789 Pine Rd",
        suburb="Lakeside",
        property_type=PropertyTypeEnum.Apartment,
        bedrooms=1,
        bathrooms=1,
        car_spaces=0,
        square_meters=60,
        price_min=300000,
        price_max=320000,
        annual_rent_min=15000,
        annual_rent_max=16000,
        expected_price=310000,
        expected_rental_income=15500,
        strata_fees=1500,
        council_rates=1100,
        water_rates=600,
        home_insurance=400,
        landlord_insurance=200,
        image_url=None,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Property(
        address="101 Maple St",
        suburb="Hillcrest",
        property_type=PropertyTypeEnum.House,
        bedrooms=4,
        bathrooms=3,
        car_spaces=2,
        square_meters=180,
        price_min=750000,
        price_max=800000,
        annual_rent_min=30000,
        annual_rent_max=32000,
        expected_price=775000,
        expected_rental_income=31000,
        strata_fees=None,
        council_rates=2000,
        water_rates=1000,
        home_insurance=800,
        landlord_insurance=400,
        image_url=None,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Property(
        address="202 Cedar Ln",
        suburb="Riverside",
        property_type=PropertyTypeEnum.Townhouse,
        bedrooms=3,
        bathrooms=2,
        car_spaces=1,
        square_meters=110,
        price_min=600000,
        price_max=630000,
        annual_rent_min=24000,
        annual_rent_max=25000,
        expected_price=615000,
        expected_rental_income=24500,
        strata_fees=1000,
        council_rates=1600,
        water_rates=900,
        home_insurance=650,
        landlord_insurance=350,
        image_url=None,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
]

# Add and commit the properties
session.add_all(properties)
session.commit()

# Query and print all properties
all_properties = session.query(Property).all()
for prop in all_properties:
    print(f"{prop.id}: {prop.address}, {prop.suburb}, {prop.property_type.value}, {prop.bedrooms} bed, {prop.bathrooms} bath, {prop.price_min}-{prop.price_max}") 