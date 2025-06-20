from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.property import PropertyRead, PropertyCreate, PropertyUpdate
from app.crud.property import get_properties, get_property_by_id, create_property, update_property, delete_property
from app.db.session import get_db

router = APIRouter()

@router.get("/properties", response_model=List[PropertyRead])
def list_properties(db: Session = Depends(get_db)) -> List[PropertyRead]:
    properties = get_properties(db)
    return [PropertyRead.model_validate(prop) for prop in properties]

@router.get("/properties/{property_id}", response_model=PropertyRead)
def get_property(property_id: int, db: Session = Depends(get_db)) -> PropertyRead:
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail=f"Property with id {property_id} not found.")
    return prop

@router.post("/properties", response_model=PropertyRead)
def add_property(property: PropertyCreate, db: Session = Depends(get_db)) -> PropertyRead:
    try:
        return create_property(db, property)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create property: {str(e)}")

@router.patch("/properties/{property_id}", response_model=PropertyRead)
def patch_property(property_id: int, updates: PropertyUpdate, db: Session = Depends(get_db)) -> PropertyRead:
    db_property = get_property_by_id(db, property_id)
    if not db_property:
        raise HTTPException(status_code=404, detail=f"Property with id {property_id} not found for update.")
    try:
        return update_property(db, db_property, updates)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update property: {str(e)}")

@router.delete("/properties/{property_id}", status_code=204)
def remove_property(property_id: int, db: Session = Depends(get_db)) -> None:
    db_property = get_property_by_id(db, property_id)
    if not db_property:
        raise HTTPException(status_code=404, detail=f"Property with id {property_id} not found for deletion.")
    try:
        delete_property(db, db_property)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete property: {str(e)}")
    return None 