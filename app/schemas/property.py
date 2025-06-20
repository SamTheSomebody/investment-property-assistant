from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.db.models.property import PropertyTypeEnum

def to_camel(string: str) -> str:
    parts = string.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

class PropertyBase(BaseModel):
    address: str
    suburb: str
    image_url: Optional[str] = None
    property_type: PropertyTypeEnum
    bedrooms: int
    bathrooms: int
    car_spaces: int
    square_meters: int
    price_min: float
    price_max: float
    annual_rent_min: float
    annual_rent_max: float
    expected_price: Optional[float] = None
    expected_rental_income: Optional[float] = None
    strata_fees: Optional[float] = None
    council_rates: Optional[float] = None
    water_rates: Optional[float] = None
    home_insurance: Optional[float] = None
    landlord_insurance: Optional[float] = None
    model_config = {"from_attributes": True}

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    address: Optional[str] = None
    suburb: Optional[str] = None
    image_url: Optional[str] = None
    property_type: Optional[PropertyTypeEnum] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    car_spaces: Optional[int] = None
    square_meters: Optional[int] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    annual_rent_min: Optional[float] = None
    annual_rent_max: Optional[float] = None
    expected_price: Optional[float] = None
    expected_rental_income: Optional[float] = None
    strata_fees: Optional[float] = None
    council_rates: Optional[float] = None
    water_rates: Optional[float] = None
    home_insurance: Optional[float] = None
    landlord_insurance: Optional[float] = None
    model_config = {"from_attributes": True}

class PropertyRead(PropertyBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}