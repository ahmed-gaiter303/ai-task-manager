import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISuggestionProps {
  taskId: string;
  suggestion?: string;
  onGenerateSuggestion?: (taskId: string) => void;
  loading?: boolean;
}

export default function AISuggestion({ 
  taskId, 
  suggestion, 
  onGenerateSuggestion,
  loading = false 
}: AISuggestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (onGenerateSuggestion) {
      onGenerateSuggestion(taskId);
    }
    setIsExpanded(true);
  };

  const handleCopy = async () => {
    if (suggestion) {
      await navigator.clipboard.writeText(suggestion);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "AI suggestion copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!suggestion && !loading) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleGenerate}
        className="gap-2 hover:shadow-glow-sm transition-all duration-200"
        data-testid={`button-generate-suggestion-${taskId}`}
      >
        <Sparkles className="h-4 w-4 animate-pulse-slow" />
        Get AI Suggestion
      </Button>
    );
  }

  return (
    <div className="space-y-2 animate-slide-in" data-testid={`container-ai-suggestion-${taskId}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        data-testid={`button-toggle-suggestion-${taskId}`}
      >
        <Sparkles className="h-4 w-4 text-primary animate-spin-slow group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">AI Suggestion</span>
      </button>
      
      {isExpanded && (
        <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-md p-4 space-y-3 animate-fade-in border border-primary/20 shadow-glow-sm">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          ) : (
            <>
              <p className="text-sm text-foreground leading-relaxed" data-testid={`text-suggestion-content-${taskId}`}>
                {suggestion}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerate}
                  className="gap-2 h-8 hover-elevate"
                  data-testid={`button-regenerate-suggestion-${taskId}`}
                >
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2 h-8 hover-elevate"
                  data-testid={`button-copy-suggestion-${taskId}`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
