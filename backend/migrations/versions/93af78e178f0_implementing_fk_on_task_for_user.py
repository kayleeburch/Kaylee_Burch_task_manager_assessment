"""implementing FK on Task for user

Revision ID: 93af78e178f0
Revises: a3fc4dfd3039
Create Date: 2024-03-18 08:44:09.679376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93af78e178f0'
down_revision = 'a3fc4dfd3039'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key("user_id", 'user', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###