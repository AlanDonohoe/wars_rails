class Monologue::PostsController < Monologue::ApplicationController
  def index
    @page = params[:page].nil? ? 1 : params[:page]
    @top_post = Monologue::Tag.where(name: 'always-at-top').first.taggings.first.post
    @posts = Monologue::Post.page(@page).includes(:user).where.not(id: @top_post.id).published
    puts '@posts ' + @posts.count.inspect
    @posts.to_a + [@top_post]
    puts '@posts ' + @posts.count.inspect
    # top_tag = Monologue::Tag.where(name: 'always-at-top').first
    # top_post = top_tag.taggings.first.post
    # puts '@posts.count ' + @posts.count.inspect
    # @posts.to_a - [top_post] if top_post.present?
    # puts 'top_tag ' + top_tag.inspect
    # puts 'top_post ' + top_post.inspect
    # puts '@posts.count ' + @posts.count.inspect
    # top_post = @posts.includes(:tags).where(tags: { name: 'always-at-top' })
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