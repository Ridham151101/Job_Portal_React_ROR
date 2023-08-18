# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create roles
admin_role = Role.find_or_create_by(name: 'admin')
job_creator = Role.find_or_create_by(name: 'job_creator')
job_seeker = Role.find_or_create_by(name: 'job_seeker')

# Create admin user
admin = User.create(name: 'Ridham Patel', email: 'ridham.patel@bacancy.com', password: '123456', password_confirmation: '123456', gender: 'male')
admin.add_role(:admin)
