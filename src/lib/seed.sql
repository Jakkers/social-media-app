-- Creating tables

CREATE TABLE IF NOT EXISTS
  users (
    id SERIAL PRIMARY key,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    email TEXT,
    bio TEXT,
    clerk_id TEXT,
    CONSTRAINT clerk_id UNIQUE (clerk_id)
  );

CREATE TABLE IF NOT EXISTS
  likes (id SERIAL PRIMARY key, likes_number TEXT);

CREATE TABLE IF NOT EXISTS
  follows (
    id SERIAL PRIMARY key,
    follower_id TEXT,
    followee_id TEXT,
    CONSTRAINT follower_id UNIQUE (follower_id),
    CONSTRAINT followee_id UNIQUE (followee_id),
    FOREIGN KEY ("follower_id") REFERENCES users ("clerk_id"),
    FOREIGN KEY ("followee_id") REFERENCES users ("clerk_id")
  );

CREATE TABLE IF NOT EXISTS
  social_posts (
    id SERIAL PRIMARY key,
    title TEXT,
    image TEXT,
    content TEXT,
    clerk_id TEXT,
    likes_id BIGINT,
    CONSTRAINT likes_id UNIQUE (likes_id),
    FOREIGN KEY ("clerk_id") REFERENCES users ("clerk_id"),
    FOREIGN KEY ("clerk_id") REFERENCES follows ("follower_id"),
    FOREIGN KEY ("clerk_id") REFERENCES follows ("followee_id"),
    FOREIGN KEY ("likes_id") REFERENCES likes ("id")
  );

-- Updated Queries for MVP

CREATE TABLE IF NOT EXISTS
  users (
    id SERIAL PRIMARY key,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    email TEXT,
    bio TEXT,
    user_image TEXT,
    clerk_id TEXT,
    CONSTRAINT clerk_id UNIQUE (clerk_id)
  );


CREATE TABLE IF NOT EXISTS
  social_posts (
    id SERIAL PRIMARY key,
    title TEXT,
    image TEXT,
    content TEXT,
    clerk_id TEXT,
    likes_id BIGINT,
    FOREIGN KEY ("clerk_id") REFERENCES users ("clerk_id"),
  );