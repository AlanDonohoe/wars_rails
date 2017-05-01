class Monologue::PostsController < Monologue::ApplicationController
  def index
    @page = params[:page].nil? ? 1 : params[:page]
    @posts = Monologue::Post.page(@page).includes(:user).where.not(id: @top_post.id).published
    top_tag = Monologue::Tag.where(name: 'always-at-top').first
    @top_post = taggings.first.post if top_tag.present
    @posts = [@top_post] + @posts.to_a if @top_post.present
  end

  def show
    if monologue_current_user
      @post = Monologue::Post.default.where("url = :url", {url: params[:post_url]}).first
    else
      @post = Monologue::Post.published.where("url = :url", {url: params[:post_url]}).first
    end
    if @post.nil?
      not_found
    end
  end

  def feed
    @posts = Monologue::Post.published.limit(25)
    if params[:tags].present?
      tags = Monologue::Tag.where(name: params[:tags].split(",")).pluck(:id)
      @posts = @posts.joins(:taggings).where("monologue_taggings.tag_id in (?)", tags)
    end
    render 'feed', layout: false
  end
end