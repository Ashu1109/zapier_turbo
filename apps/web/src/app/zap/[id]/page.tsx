
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Appbar } from "../../components/appbar";
import { PrimaryButton } from "../../components/button/primarybutton";
import { ZapCell } from "../../components/zap-cell";
import { getTriggerAction } from "../../action/get-trigger-action";

export default function Page(): JSX.Element {
    const router = useRouter();
    const [availableActions,setAvailableActions]= useState<{ id: string; name: string; }[]>([]);
    const [availableTriggers,setAvailableTriggers]= useState<{ id: string; name: string; }[]>([]);
    const token = localStorage.getItem("token");
    if(!token){
        router.push("/")
    }
    useEffect(() => {
      getTriggerAction().then((res) => {
        setAvailableActions(res.action);
        setAvailableTriggers(res.trigger);
      }).catch(() => {
        // console.log("error")
      })
    }, [])

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return <div>
        <Appbar />
        <div className="flex justify-end bg-slate-200 p-4">
            <PrimaryButton onClick={()=>{
                router.push("/zap/create")
            }}>Publish</PrimaryButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200  flex flex-col ">
            <div className="flex justify-center w-full">
                <ZapCell index={1} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} onClick={() => {
                    setSelectedModalIndex(1);
                }} />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action) => <div className="pt-2 flex justify-center" key={action.index}> <ZapCell index={action.index} name={action.availableActionName ? action.availableActionName : "Action"} onClick={() => {
                    setSelectedModalIndex(action.index);
                }} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: ""
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></PrimaryButton>
                </div>
            </div>
        </div>
        {selectedModalIndex ? <Modal availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} index={selectedModalIndex} onSelect={(props: null | { name: string; id: string; }) => {
            if (props === null) {
                setSelectedModalIndex(null);
                return;
            }
            if (selectedModalIndex === 1) {
                setSelectedTrigger({
                    id: props.id,
                    name: props.name
                })
            } else {
                setSelectedActions(a => {
                    const newActions = [...a];
                    newActions[selectedModalIndex - 2] = {
                        index: selectedModalIndex,
                        availableActionId: props.id,
                        availableActionName: props.name
                    }
                    return newActions
                })
            }
            setSelectedModalIndex(null);
        }} /> : null}
    </div>
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; }) => void, availableItems: {id: string, name: string}[] }):JSX.Element {
    return <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <div className="text-xl">
                    Select {index === 1 ? "Trigger" : "Action"}
                </div>
                <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={() => {
                    onSelect(null);
                }} type="button">
                    <svg aria-hidden="true" className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                {availableItems.map(({id, name}) => {
                    return <Button className="flex border p-4 cursor-pointer hover:bg-slate-100" key={id} onClick={() => {
                        onSelect({
                            id,
                            name
                        })
                    }} variant="outline">
                      <div className="flex flex-col justify-center"> {name} </div>
                    </Button>
                })}
            </div>
        </div>
    </div>
</div>
}