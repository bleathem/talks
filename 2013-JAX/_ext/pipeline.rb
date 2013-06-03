require File.join File.dirname(__FILE__), 'tweakruby'
require_relative "copy_files.rb"

Awestruct::Extensions::Pipeline.new do
  extension Awestruct::Extensions::CopyFiles.new
  # extension Awestruct::Extensions::Posts.new( '/news' ) 
  # extension Awestruct::Extensions::Indexifier.new
end

