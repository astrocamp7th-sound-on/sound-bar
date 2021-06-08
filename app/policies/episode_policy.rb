class EpisodePolicy < ApplicationPolicy
  def edit?
    user.podcasts.include? record.podcast
  end

  def update?
    edit?
  end

  def show?
    edit?
  end

  def destroy?
    edit?
  end
end
