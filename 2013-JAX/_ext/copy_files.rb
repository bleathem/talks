require 'fileutils'

module Awestruct
  module Extensions
    class CopyFiles

      def initialize()
        @source = "_files"
        @target   = "_site/files"
      end

      def execute(site)
        unless File.directory?(@target)
          FileUtils.makedirs @target
        end
        source = "#{@source}/."
        puts source
        FileUtils.cp_r @source + '/.', @target, :remove_destination => true
      end
    end
  end
end
