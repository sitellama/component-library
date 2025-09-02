import React, { useState, useEffect } from 'react';

const Components: React.FC = () => {
    const [sections, setSections] = useState<number>(() => {
        const saved = localStorage.getItem('sections-count');
        return saved ? Number(saved) : 3;
    });

    // Section names state
    const [sectionNames, setSectionNames] = useState<string[]>(() => {
        const saved = localStorage.getItem('sections-names');
        if (saved) return JSON.parse(saved);
        return Array.from({ length: 3 }, (_, i) => `Section ${i + 1}`);
    });

    // Editing state
    const [editingIdx, setEditingIdx] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('sections-count', sections.toString());
    }, [sections]);

    useEffect(() => {
        localStorage.setItem('sections-names', JSON.stringify(sectionNames));
    }, [sectionNames]);

    // Sync sectionNames when sections count changes
    useEffect(() => {
        setSectionNames(prev => {
            if (sections > prev.length) {
                return [
                    ...prev,
                    ...Array.from({ length: sections - prev.length }, (_, i) => `Section ${prev.length + i + 1}`)
                ];
            } else if (sections < prev.length) {
                return prev.slice(0, sections);
            }
            return prev;
        });
    }, [sections]);

    // Move section up
    const moveUp = (idx: number) => {
        if (idx === 0) return;
        setSectionNames(prev => {
            const arr = [...prev];
            [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
            return arr;
        });
    };

    // Move section down
    const moveDown = (idx: number) => {
        if (idx === sections - 1) return;
        setSectionNames(prev => {
            const arr = [...prev];
            [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
            return arr;
        });
    };

    const handleAddSection = () => {
        setSections(sections + 1);
    };

    const handleEditClick = (idx: number) => {
        setEditingIdx(idx);
    };

    const handleEraseClick = () => {
        setSectionNames(prev => {
            if (
                editingIdx !== null &&
                (!prev[editingIdx] || prev[editingIdx].trim() === '')
            ) {
                const arr = [...prev];
                arr[editingIdx] = `Section ${editingIdx + 1}`;
                return arr;
            }
            return prev;
        });
        setEditingIdx(null);
    };

    const handleNameChange = (idx: number, value: string) => {
        setSectionNames(prev => {
            const arr = [...prev];
            arr[idx] = value;
            return arr;
        });
    };

    return (
        <div className="border-2 border-neutral-800 p-4 w-full box-border flex flex-col gap-4">
            {/* Render all sections */}
            {sectionNames.map((name, idx) => (
                <div key={idx} className="w-full">
                    <div className="font-bold mb-1 text-left flex items-center gap-1.5">
                        {editingIdx === idx ? (
                            <>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => handleNameChange(idx, e.target.value)}
                                    className="font-bold text-base px-2 py-1 border border-neutral-300 rounded focus:outline-none"
                                    autoFocus
                                    placeholder={`Section ${idx + 1}`}
                                />
                                <span
                                    className="cursor-pointer flex items-center"
                                    onClick={handleEraseClick}
                                    aria-label="Done editing"
                                >
                                    {/* Eraser icon */}
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"><path d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="#000" strokeWidth="1.5"></path><path d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z" stroke="#000" strokeWidth="1.5"></path><path d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z" stroke="#000" strokeWidth="1.5"></path></svg>
                                </span>
                            </>
                        ) : (
                            <>
                                {name}
                                <span
                                    className="cursor-pointer flex items-center"
                                    onClick={() => handleEditClick(idx)}
                                    aria-label="Edit section name"
                                >
                                    {/* Pencil icon */}
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                            </>
                        )}
                    </div>
                    <div className="border-2 border-dashed border-neutral-600 w-full py-6 box-border flex items-center justify-end gap-2 pr-2">
                        <div className="flex gap-2">
                            {/* Up arrow */}
                            {idx > 0 && (
                                <button
                                    className="bg-transparent border-none cursor-pointer p-0"
                                    onClick={() => moveUp(idx)}
                                    aria-label="Move up"
                                >
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"><path d="M12 16V8M12 8L15.5 11.5M12 8L8.5 11.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            )}
                            {/* Down arrow */}
                            {idx < sections - 1 && (
                                <button
                                    className="bg-transparent border-none cursor-pointer p-0"
                                    onClick={() => moveDown(idx)}
                                    aria-label="Move down"
                                >
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><path d="M8.5 11L12 14.5L15.5 11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            {/* Plus icon section */}
            <div
                className="border-2 border-dashed border-neutral-600 w-full py-6 box-border flex justify-center items-center cursor-pointer"
                onClick={handleAddSection}
            >
                <div>Add a Section</div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="14" y="6" width="4" height="20" fill="#666" />
                    <rect x="6" y="14" width="20" height="4" fill="#666" />
                </svg>
            </div>
        </div>
    );
};

export default Components;