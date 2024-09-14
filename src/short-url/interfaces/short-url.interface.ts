export interface ShortURL {
    data: ShortURLData;
}

export interface ShortURLData {
    data:   DataData;
    code:   number;
    errors: any[];
}

export interface DataData {
    domain:     string;
    alias:      string;
    deleted:    boolean;
    archived:   boolean;
    analytics:  Analytics;
    tags:       any[];
    created_at: Date;
    expires_at: null;
    tiny_url:   string;
    url:        string;
}

export interface Analytics {
    enabled: boolean;
    public:  boolean;
}
