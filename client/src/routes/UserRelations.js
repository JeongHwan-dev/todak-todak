import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForceGraph2D from 'react-force-graph-2d';

export default function UserRelations() {
    const url = `${window.location.origin}:5000`;
    const [GDB, setGDB] = useState();
    const [links, setLinks] = useState();
    const [nodes, setNodes] = useState();

    async function getGraphDB() {
        const response = await axios.post(url + '/user-relations', {
            method: "POST",
            body: JSON.stringify({
              userid: sessionStorage.userid,
            }),
            withCredentials: true,
          })
        setGDB(response.data.data)
    }

    useEffect(() => {
        getGraphDB();
    }, [])

    return (
        <>
          <div style={{ height: '90%', width: "90%" }}>
          <ForceGraph2D
            graphData={GDB}
            enableDrag={false}
            nodeAutoColorBy="nickname"
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.nickname;
              const fontSize = 200;
              ctx.font = `${fontSize}px Sans-Serif #ff8e4a`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.1); // some padding
              ctx.fillStyle = 'rgba(255, 255, 255, 0)';
              ctx.fillRect(node.x - bckgDimensions[0]/2, node.y - bckgDimensions[1]/2, ...bckgDimensions);

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y);
            }}
        />
          </div>
      </>
    );
}
