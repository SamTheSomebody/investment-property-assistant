#This Base class is the foundation for all your ORM (object-relational-mapping) models.
#It tracks table definitions and metadata, which Alembic uses to generate migrations.

from sqlalchemy.orm import declarative_base
Base = declarative_base()
