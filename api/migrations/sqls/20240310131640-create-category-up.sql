CREATE TABLE public.category (
  id              INT NOT NULL GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name            TEXT NOT NULL,
  color           TEXT,
  icon            TEXT,
  user_id         INT NOT NULL, -- Foreign key column
  created_by      TEXT DEFAULT 'system',
  created_date    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by      TEXT DEFAULT 'system',
  updated_date    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_category_user FOREIGN KEY (user_id)
    REFERENCES public.user (id) ON DELETE RESTRICT
);

-- Index for user_id foreign key in category
CREATE INDEX idx_category_user_id ON public.category(user_id);
