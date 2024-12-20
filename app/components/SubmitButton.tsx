import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
    
    const {pending} = useFormStatus();

    return (
        <>
            { pending ? (
                <Button disabled> Please wait 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button type="submit"> Create your product </Button>
            )
            }
        </>
    )
}