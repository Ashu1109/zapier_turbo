"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Appbar } from "../../components/appbar";
import { PrimaryButton } from "../../components/button/primarybutton";
import { ZapCell } from "../../components/zap-cell";
import { getTriggerAction } from "../../action/get-trigger-action";
import { CreateZap } from "../../action/create-zap";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [availableActions, setAvailableActions] = useState<
    { id: string; name: string }[]
  >([]);
  const [availableTriggers, setAvailableTriggers] = useState<
    { id: string; name: string }[]
  >([]);
  useEffect(() => {
    const tokenGet = localStorage.getItem("token") || "";
    if (!tokenGet) {
      router.push("/");
    }
    getTriggerAction()
      .then((res) => {
        setAvailableActions(res.action);
        setAvailableTriggers(res.trigger);
      })
      .catch(() => {
        // console.log("error")
      });
  }, [router]);

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  }>();

  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      metadata:unknown
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );
  return (
    <div>
      <Appbar />
      <div className="flex justify-end bg-slate-200 p-4">
        <PrimaryButton
          onClick={async() => {
            if (!selectedTrigger?.id) {
              return;
            }
            const token = localStorage.getItem("token") || "";
            await CreateZap(token,selectedTrigger,selectedActions)
            router.push("/dashboard")
          }}
        >
          Publish
        </PrimaryButton>
      </div>
      <div className="w-full min-h-screen bg-slate-200  flex flex-col ">
        <div className="flex justify-center w-full">
          <ZapCell
            index={1}
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            onClick={() => {
              setSelectedModalIndex(1);
            }}
          />
        </div>
        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action) => (
            <div className="pt-2 flex justify-center" key={action.index}>
              <ZapCell
                index={action.index}
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                onClick={() => {
                  setSelectedModalIndex(action.index);
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    index: a.length + 2,
                    availableActionId: "",
                    availableActionName: "",
                    metadata: {},
                  },
                ]);
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
      {selectedModalIndex ? (
        <Modal
          availableItems={
            selectedModalIndex === 1 ? availableTriggers : availableActions
          }
          index={selectedModalIndex}
          onSelect={(props: null | { name: string; id: string; metadata:unknown }) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex === 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
              });
            } else {
              setSelectedActions((a) => {
                const newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                  metadata:props.metadata
                };
                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
        />
      ) : null}
    </div>
  );
}

function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (props: null | { name: string; id: string; metadata:unknown }) => void;
  availableItems: { id: string; name: string }[];
}): JSX.Element {
  const istrigger = index === 1;
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "",
  });
  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <div className="text-xl">
              Select {index === 1 ? "Trigger" : "Action"}
            </div>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
              onClick={() => {
                onSelect(null);
              }}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {step === 1 && selectedAction.id === "email" && <EmailSelector setMetadata={(metadata)=>{
            onSelect({
              ...selectedAction,
              metadata
            })
          }}  />}
          {step === 1 && selectedAction.id === "sol" && <SolanaSelector 
          setMetadata={(metadata)=>{
            onSelect({
              ...selectedAction,
              metadata
            })
          }}   />}
          {step === 0 && (
            <div className="p-4 md:p-5 flex flex-1 gap-2">
              {availableItems.map(({ id, name }) => {
                return (
                  <Button
                    className="flex border p-4 cursor-pointer hover:bg-slate-100"
                    key={id}
                    onClick={() => {
                      if (istrigger) {
                        onSelect({ name, id,metadata:{} });
                      } else {
                        setStep((s) => s + 1);
                        setSelectedAction({ name, id });
                      }
                    }}
                    variant="outline"
                  >
                    <div className="flex flex-col justify-center">{name} </div>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailSelector({setMetadata}:{setMetadata:(params:unknown)=>void}): JSX.Element {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="To"
          type="text"
          value={email}
        />
        <Input
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Body"
          value={body}
        />
         <PrimaryButton onClick={()=>{
          setMetadata({
            email,
            body
          })
        }}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}

function SolanaSelector({setMetadata}:{setMetadata:(params:unknown)=>void}):JSX.Element {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="To"
          type="text"
          value={address}
        />
         <Input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="Amount"
          type="text"
          value={amount}
        />
        <PrimaryButton onClick={()=>{
          setMetadata({
            amount,
            address
          })
        }}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}
