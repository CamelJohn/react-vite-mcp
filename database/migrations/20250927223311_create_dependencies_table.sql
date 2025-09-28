CREATE TABLE IF NOT EXISTS dependencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dependent_id INTEGER NOT NULL,
    depends_on_id INTEGER NOT NULL,
    type TEXT DEFAULT 'feature', -- could also track file-level dependencies
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(dependent_id, depends_on_id),
    FOREIGN KEY (dependent_id) REFERENCES features(id) ON DELETE CASCADE,
    FOREIGN KEY (depends_on_id) REFERENCES features(id) ON DELETE CASCADE
);
