class PodcastPolicy < ApplicationPolicy
  def update?
    user.podcasts.include? record
  end

  def destroy?
    update?
  end

  def info?
    update?
  end

  def dashboard?
    update?
  end

  def music?
    update?
  end

  def donate?
    update?
  end
end
