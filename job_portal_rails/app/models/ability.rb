class Ability
  include CanCan::Ability

  def initialize(user)
    if user.has_role?(:admin)
      can :manage, :all # Admin has full access to all resources
    elsif user.has_role?(:job_creator)
      can :manage, Company, company_creator_id: user.id
      can :manage, Job, job_creator_id: user.id
      can :read, Review
      cannot :manage, JobApplication
    elsif user.has_role?(:job_seeker)
      can :read, Job, status: 'open'
      can :read, Company
      can :manage, JobApplication, job_seeker_id: user.id
      can :manage, Review, job_seeker_id: user.id
    end
  end
end
