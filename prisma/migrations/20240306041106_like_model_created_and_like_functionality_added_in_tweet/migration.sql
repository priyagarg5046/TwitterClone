-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "likecount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "tweetid" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
