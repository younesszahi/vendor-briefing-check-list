"use client";

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/lib/form-schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash, Save, Edit, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface AdditionalPageProps {
  form: UseFormReturn<FormValues>;
  pageId: string;
  index: number;
}

export default function AdditionalPage({ form, pageId, index }: AdditionalPageProps) {
  const [newQuestion, setNewQuestion] = useState({ text: '', type: 'text' });
  const [editingTitle, setEditingTitle] = useState(false);
  const [newContent, setNewContent] = useState('');

  const additionalPages = form.getValues('additionalPages') || [];
  const currentPage = additionalPages.find(page => page.id === pageId) || { 
    id: pageId, 
    title: `Additional Page ${index + 1}`, 
    content: [], 
    questions: [] 
  };

  const updatePage = (updatedPage: any) => {
    const updatedPages = additionalPages.map(page => 
      page.id === pageId ? { ...page, ...updatedPage } : page
    );
    form.setValue('additionalPages', updatedPages);
  };

  const addQuestion = () => {
    if (!newQuestion.text.trim()) return;
    
    const updatedQuestions = [
      ...(currentPage.questions || []),
      { 
        text: newQuestion.text, 
        type: newQuestion.type,
        options: newQuestion.type === 'radio' || newQuestion.type === 'checkbox' ? ['Option 1'] : undefined,
        answer: undefined
      }
    ];
    
    updatePage({ questions: updatedQuestions });
    setNewQuestion({ text: '', type: 'text' });
  };

  const addContent = () => {
    if (!newContent.trim()) return;
    
    const updatedContent = [...(currentPage.content || []), newContent];
    updatePage({ content: updatedContent });
    setNewContent('');
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...currentPage.questions];
    updatedQuestions.splice(index, 1);
    updatePage({ questions: updatedQuestions });
  };

  const removeContent = (index: number) => {
    const updatedContent = [...currentPage.content];
    updatedContent.splice(index, 1);
    updatePage({ content: updatedContent });
  };

  const saveTitle = (title: string) => {
    if (title.trim()) {
      updatePage({ title });
    }
    setEditingTitle(false);
  };

  const renderQuestionInput = (question: any, index: number) => {
    const questionPath = `additionalPages.${index}.questions.${index}.answer`;
    
    switch (question.type) {
      case 'checkbox':
        return (
          <FormField
            control={form.control}
            name={questionPath}
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{question.text}</FormLabel>
              </FormItem>
            )}
          />
        );
      case 'text':
      default:
        return (
          <FormField
            control={form.control}
            name={questionPath}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.text}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <Card className="form-section">
        <div className="flex justify-between items-center mb-4">
          {editingTitle ? (
            <div className="flex items-center gap-2 w-full">
              <Input 
                value={currentPage.title}
                onChange={(e) => updatePage({ title: e.target.value })}
                className="flex-1"
              />
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => saveTitle(currentPage.title)}
                className="flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{currentPage.title}</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setEditingTitle(true)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-accent" />
            Content Sections
          </h4>
          <div className="space-y-3 mb-4">
            {(currentPage.content || []).map((content, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="flex-1 p-3 border rounded-md bg-secondary/20">
                  <p>{content}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeContent(idx)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-start">
            <Textarea 
              value={newContent} 
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Add new content section here..."
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={addContent}
              className="mt-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Questions */}
        <div>
          <h4 className="text-md font-medium mb-2">Questions</h4>
          <div className="space-y-4 mb-4">
            {(currentPage.questions || []).map((question, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="flex-1">
                  {renderQuestionInput(question, idx)}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
                  onClick={() => removeQuestion(idx)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-4 border rounded-md bg-secondary/10">
            <div className="flex gap-3">
              <Input 
                value={newQuestion.text} 
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                placeholder="Question text"
                className="flex-1"
              />
              <Select 
                value={newQuestion.type} 
                onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Input</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              onClick={addQuestion}
              className="self-end"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Question
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}