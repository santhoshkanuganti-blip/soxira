'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const TOOLBAR_BUTTONS = [
  { cmd: 'toggleBold', label: 'B', title: 'Bold', style: 'font-bold' },
  { cmd: 'toggleItalic', label: 'I', title: 'Italic', style: 'italic' },
  { cmd: 'toggleStrike', label: 'S̶', title: 'Strikethrough', style: '' },
  { cmd: 'toggleCode', label: '<>', title: 'Inline Code', style: 'font-mono text-xs' },
];

const HEADING_LEVELS = [1, 2, 3] as const;

export default function RichTextEditor({ value, onChange, placeholder = 'Write your content here…' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-violet-400 underline' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[320px] text-sm text-slate-300 leading-7 prose prose-invert prose-sm max-w-none focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
        {HEADING_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`rounded px-2 py-1 text-xs font-semibold transition ${
              editor.isActive('heading', { level }) ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            H{level}
          </button>
        ))}
        <div className="mx-1 h-4 w-px bg-white/10" />
        {TOOLBAR_BUTTONS.map((btn) => (
          <button
            key={btn.cmd}
            type="button"
            onClick={() => {
              const chain = editor.chain().focus();
              (chain as unknown as Record<string, () => typeof chain>)[btn.cmd]().run();
            }}
            title={btn.title}
            className={`rounded px-2 py-1 text-xs transition ${btn.style} ${
              editor.isActive(btn.cmd.replace('toggle', '').toLowerCase()) ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
        <div className="mx-1 h-4 w-px bg-white/10" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-xs transition ${editor.isActive('bulletList') ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10'}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-xs transition ${editor.isActive('orderedList') ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10'}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded px-2 py-1 text-xs transition ${editor.isActive('blockquote') ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10'}`}
        >
          " Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="rounded px-2 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white transition"
        >
          — HR
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="rounded px-2 py-1 text-xs text-slate-500 hover:bg-white/10 hover:text-white transition disabled:opacity-30"
          >
            ↩
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="rounded px-2 py-1 text-xs text-slate-500 hover:bg-white/10 hover:text-white transition disabled:opacity-30"
          >
            ↪
          </button>
        </div>
      </div>
      {/* Editor */}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
