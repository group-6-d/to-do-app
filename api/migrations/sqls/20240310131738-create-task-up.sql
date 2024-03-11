CREATE TABLE public.task (
  id              INT NOT NULL GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  due_date        TIMESTAMP WITH TIME ZONE,
  priority        TEXT,
  status          TEXT,
  user_id         INT NOT NULL, -- Foreign key column
  category_id     INT NOT NULL, -- Foreign key column
  created_by      TEXT DEFAULT 'system',
  created_date    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by      TEXT DEFAULT 'system',
  updated_date    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_task_user FOREIGN KEY (user_id)
    REFERENCES public.user (id) ON DELETE RESTRICT,
  CONSTRAINT fk_task_category FOREIGN KEY (category_id)
    REFERENCES public.category (id) ON DELETE RESTRICT
);

-- Indexes for foreign key columns in task
CREATE INDEX idx_task_user_id ON public.task(user_id);
CREATE INDEX idx_task_category_id ON public.task(category_id);
