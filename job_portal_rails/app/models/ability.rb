# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user.has_role?(:admin)
      can :manage, :all # Admin has full access to all resources
    elsif user.has_role?(:job_creator)
      can :manage, Company, job_creator_id: user.id
    end
  end
end
