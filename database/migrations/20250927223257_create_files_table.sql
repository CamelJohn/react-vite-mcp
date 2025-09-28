CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_id INTEGER NOT NULL,
    path TEXT NOT NULL,
    type TEXT NOT NULL, -- tsx, css, ts, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(feature_id, path),
    FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
);
