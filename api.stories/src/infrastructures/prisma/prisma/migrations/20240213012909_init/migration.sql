-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "stories_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "stories_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storie" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "Storie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_stories_id_fkey" FOREIGN KEY ("stories_id") REFERENCES "Storie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_stories_id_fkey" FOREIGN KEY ("stories_id") REFERENCES "Storie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
