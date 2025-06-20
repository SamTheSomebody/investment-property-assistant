import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.models.property import Property, PropertyTypeEnum, Base
from app.crud.property import create_property, get_property_by_id, update_property, delete_property
from app.schemas.property import PropertyCreate, PropertyUpdate
from datetime import datetime

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


def test_crud_property(db):
    # Create
    prop_in = PropertyCreate(
        address="Test Address",
        suburb="Test Suburb",
        image_url=None,
        property_type=PropertyTypeEnum.House,
        bedrooms=2,
        bathrooms=1,
        car_spaces=1,
        square_meters=80,
        price_min=300000,
        price_max=350000,
        annual_rent_min=15000,
        annual_rent_max=17000,
        expected_price=325000,
        expected_rental_income=16000,
        strata_fees=1000,
        council_rates=1200,
        water_rates=500,
        home_insurance=400,
        landlord_insurance=200
    )
    db_property = create_property(db, prop_in)
    assert db_property.id is not None
    assert db_property.address == "Test Address"

    # Read
    fetched = get_property_by_id(db, db_property.id)
    assert fetched is not None
    assert fetched.address == "Test Address"

    # Update
    updates = PropertyUpdate(address="Updated Address", bedrooms=3)
    updated = update_property(db, fetched, updates)
    assert updated.address == "Updated Address"
    assert updated.bedrooms == 3

    # Delete
    delete_property(db, updated)
    deleted = get_property_by_id(db, updated.id)
    assert deleted is None 