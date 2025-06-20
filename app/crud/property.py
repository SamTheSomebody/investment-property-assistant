from sqlalchemy.orm import Session
from app.db.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate
from datetime import datetime
from typing import List, Optional

def get_properties(db: Session) -> List[Property]:
    return db.query(Property).all()

def get_property_by_id(db: Session, property_id: int) -> Optional[Property]:
    return db.query(Property).filter(Property.id == property_id).first()

def create_property(db: Session, property: PropertyCreate) -> Property:
    db_property = Property(
        **property.model_dump(),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

def update_property(db: Session, db_property: Property, updates: PropertyUpdate) -> Property:
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_property, field, value)
    setattr(db_property, "updated_at", datetime.now())
    db.commit()
    db.refresh(db_property)
    return db_property

def delete_property(db: Session, db_property: Property) -> None:
    db.delete(db_property)
    db.commit() 