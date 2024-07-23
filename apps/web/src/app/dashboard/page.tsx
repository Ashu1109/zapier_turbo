"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import { Appbar } from "../components/appbar";
import { DarkButton } from "../components/button/darkbutton";
import webhookImg from "../assets/webhook.jpeg";
import emailImg from "../assets/email.jpeg"
import solImg from "../assets/sol.png"
import { getZap } from "../action/get-zap";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  createdAt: Date;
  action: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}
function Page(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>();
  useEffect(() => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      getZap(token)
        .then((z) => {
          setZaps(z as unknown as Zap[]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, [router]);
  if (!zaps) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg	 w-full">
          <div className="flex justify-between pr-8 ">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <div className="flex justify-center">
            {" "}
            <ZapTable zaps={zaps} />{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

function getImageForType(typeName: string):JSX.Element {
  switch (typeName) {
    case "email":
      return <Image alt="email" src={emailImg} width={20} />;
    case "send_sol":
      return <Image alt="sol" src={solImg} width={20} />;
    default:
      return <div>{typeName}</div>;
  }
}

function ZapTable({ zaps }: { zaps: Zap[] }): JSX.Element {
  const router = useRouter();
  return (
    <div className=" flex justify-center flex-1 m-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="text-lg font-semibold">Name</div>
            </TableHead>
            <TableHead>
              <div className="text-lg font-semibold">Id</div>
            </TableHead>
            <TableHead>
              <div className="text-lg font-semibold">Created at</div>
            </TableHead>
            <TableHead>
              <div className="text-lg font-semibold">Webhook URL</div>
            </TableHead>
            <TableHead>
              <div className="text-lg font-semibold">GO</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" mx-7 py-8">
          {zaps.map((zap) => {
            return (
              <TableRow key={zap.id}>
                <TableCell className="flex gap-2">{zap.trigger.type.name==="webhook" && <Image alt="webhook" src={webhookImg} width={20} />} {zap.action.map(a=>{
                  return getImageForType(a.type.name)
                }
                )}</TableCell>
                <TableCell>{zap.id}</TableCell>
                <TableCell>
                  {new Date(zap.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs  w-16">
                  {`http://localhost:3002/hooks/catch/${zap.userId}/${zap.id}`}<Button onClick={()=>{
                    void navigator.clipboard.writeText(`http://localhost:3002/hooks/catch/${zap.userId}/${zap.id}`);
                  }} size="sm" variant="outline">
                    Copy
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      router.push(`/zap/${zap.id}`);
                    }}
                    variant="secondary"
                  >
                    Go
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
