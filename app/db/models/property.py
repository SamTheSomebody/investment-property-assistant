from sqlalchemy import Column, Integer, String, Float, Enum, DateTime
from sqlalchemy.dialects.postgresql import JSONB 
from datetime import datetime
from app.db.base import Base
import enum

class PropertyTypeEnum(enum.Enum):
    House = "House"
    Townhouse = "Townhouse"
    Apartment = "Apartment"

class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now)
    address = Column(String, nullable=False)
    suburb = Column(String, nullable=False)
    image_url = Column(String, nullable=True) 
    property_type = Column(Enum(PropertyTypeEnum), nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    car_spaces = Column(Integer, nullable=False)
    square_meters = Column(Integer, nullable=False)
    price_min = Column(Float, nullable=False)
    price_max = Column(Float, nullable=False)
    annual_rent_min = Column(Float, nullable=False)
    annual_rent_max = Column(Float, nullable=False)
    expected_price = Column(Float, nullable=True)
    expected_rental_income = Column(Float, nullable=True)
    strata_fees = Column(Float, nullable=True)
    council_rates = Column(Float, nullable=True)
    water_rates = Column(Float, nullable=True)
    home_insurance = Column(Float, nullable=True)
    landlord_insurance = Column(Float, nullable=True)