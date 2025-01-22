import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const CreateModal = ({ onClose }: { onClose?: (() => void) | null }) => {
  return (
    <Modal>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Assistant</CardTitle>
          <CardDescription>
            Have an assistant help with your posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  What should we name this assistant?
                </Label>
                <Input id="name" placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Whose style should we learn?</Label>
                <Input id="username" placeholder="@username" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {onClose ? <Button variant="outline">close</Button> : null}
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};
