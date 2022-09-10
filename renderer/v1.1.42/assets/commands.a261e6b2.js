import{g as A,C as a,t as d,h as w,c as y,b as I,w as m,o as g,d as h,e as P,f as D}from"./compositor.2f10f91d.js";const{state:s}=a,N=async n=>{const t=A();if(!t)return;const o={...t.props,...n.props},e=await a.clients.LiveApi().collection.updateCollection({collectionId:t.id,updateMask:["metadata"],metadata:{...t.metadata,props:o}});await d("UserChanged",e.collection)},f=async(n={})=>{const{props:t={},size:o,settings:e={}}=n,c=await a.Request.createProject({settings:e,props:t,size:o});await d("ProjectAdded",c.project);const i=await w(c.project,"ROLE_HOST");return y(i)},k=async n=>{const{projectId:t}=n;await a.Request.deleteProject({projectId:t}),await d("ProjectRemoved",{projectId:t})},b=async n=>{const{projectId:t}=n,o=A().id,e=I(t),c={...e.props,...n.props},i=await a.clients.LiveApi().project.updateProject({collectionId:o,projectId:t,updateMask:["metadata"],metadata:{...e.videoApi.project.metadata,props:c}});await d("ProjectChanged",{project:i.project})},R=n=>b({projectId:n.projectId,props:n.meta}),M=async n=>{const{projectId:t}=n,o=A().id,e=I(t),c={...e.props,...n.props};await a.clients.LiveApi().project.updateProject({collectionId:o,projectId:t,updateMask:["metadata"],metadata:{...e.videoApi.project.metadata,props:c}})},T=async n=>{const t=s.projects.find(e=>e.id===n.projectId);if(!t){s.activeProjectId=null,d("ActiveProjectChanged",{projectId:null});return}const o=s.projects.find(e=>e.id===s.activeProjectId);if(t!==o)return o&&(Array.from(m.rooms.keys()).map(m.removeRoom),await a.clients.LayoutApi().unsubscribeFromLayout(o.layoutApi.layoutId),await a.clients.LiveApi().unsubscribeFromProject(o.videoApi.project.collectionId,o.videoApi.project.projectId)),await a.clients.LayoutApi().subscribeToLayout(t.layoutApi.layoutId),await a.clients.LiveApi().subscribeToProject(t.videoApi.project.collectionId,t.videoApi.project.projectId),a.clients.LiveApi().project.getProject({collectionId:t.videoApi.project.collectionId,projectId:t.videoApi.project.projectId,status:!0}).then(e=>{var c,i;d("ProjectChanged",{project:e.project,phase:(c=e.status)==null?void 0:c.phase,broadcastId:(i=e.status)==null?void 0:i.broadcastId})}),d("ActiveProjectChanged",{projectId:t.id}),y(t)},B=async n=>{const{projectId:t,displayName:o="Guest"}=n,e=s.projects.find(v=>v.id===t);let c=e.sfuToken;if(!c){let{webrtcAccess:v}=await a.clients.LiveApi().authentication.createWebRtcAccessToken({collectionId:e.videoApi.project.collectionId,projectId:e.videoApi.project.projectId,displayName:o});c=v.accessToken}const r=g(c).video.room,j=new URL(a.clients.getLiveKitServer()),p=j.host+j.pathname,l=m.ensureRoom(p,r,c);l.bindApiClient(a.clients),await l.connect(),e.sfuToken=c,e.roomId=r;const u=h(r);return P("RoomJoined",{projectId:e.id,room:u}),u},U=async n=>{let{props:t={},parentId:o,index:e,projectId:c=s.activeProjectId}=n;const i=I(c);t={...t,layoutId:i.layoutApi.layoutId,type:"child"};const r=await i.compositor.insert(t,o,e);return d("NodeAdded",{projectId:c,nodeId:r}),d("NodeChanged",{projectId:c,nodeId:o}),i.compositor.get(r)},x=async n=>{var i;let{nodeId:t,projectId:o=s.activeProjectId}=n;const e=I(o),c=(i=e.compositor.getParent(t))==null?void 0:i.id;e.compositor.remove(t),d("NodeRemoved",{projectId:o,nodeId:t}),d("NodeChanged",{projectId:o,nodeId:c})},K=async n=>{let{nodeId:t,props:o={},projectId:e=s.activeProjectId}=n;const c=I(e);return delete o.type,delete o.sourceType,c.compositor.update(t,o),d("NodeChanged",{projectId:e,nodeId:t}),c.compositor.get(t)},E=async n=>{let{nodeId:t,layout:o,projectId:e=s.activeProjectId,layoutProps:c={}}=n;I(e).compositor.update(t,{layout:o,layoutProps:c}),d("NodeChanged",{projectId:e,nodeId:t})},S=async n=>{const{nodeId:t,parentId:o,projectId:e=s.activeProjectId,index:c}=n;I(e).compositor.move(t,o,c),d("NodeChanged",{projectId:e,nodeId:t})},q=async n=>{var j,p;const{nodeAId:t,nodeBId:o,projectId:e=s.activeProjectId}=n,c=I(e),i=(j=c.compositor.getParent(t))==null?void 0:j.id,r=(p=c.compositor.getParent(o))==null?void 0:p.id;c.compositor.swap(t,o),d("NodeChanged",{projectId:e,nodeId:i}),d("NodeChanged",{projectId:e,nodeId:r})},F=async n=>{const{parentId:t,childIds:o,projectId:e=s.activeProjectId}=n;I(e).compositor.reorder(t,o),d("NodeChanged",{projectId:e,nodeId:t})},O=async n=>{const{projectId:t=s.activeProjectId}=n,o=I(t);await a.clients.LiveApi().project.startProjectBroadcast({collectionId:o.videoApi.project.collectionId,projectId:o.videoApi.project.projectId})},W=async n=>{const{projectId:t=s.activeProjectId}=n,o=I(t);await a.clients.LiveApi().project.stopProjectBroadcast({collectionId:o.videoApi.project.collectionId,projectId:o.videoApi.project.projectId})},z=async n=>{var u;const{rtmpUrl:t,rtmpKey:o,enabled:e,projectId:c=s.activeProjectId,metadata:i={},props:r={}}=n,j=I(c),p={rtmpPush:{key:o,url:t}},l=await((u=a.clients.LiveApi().destination)==null?void 0:u.createDestination({collectionId:j.videoApi.project.collectionId,projectId:j.videoApi.project.projectId,address:p,enabled:e,metadata:{props:{...i,...r}}}));return await d("DestinationAdded",l.destination),D(l.destination)},G=async n=>{var c;const{destinationId:t,projectId:o=s.activeProjectId}=n,e=I(o);await((c=a.clients.LiveApi().destination)==null?void 0:c.deleteDestination({collectionId:e.videoApi.project.collectionId,projectId:e.videoApi.project.projectId,destinationId:t})),await d("DestinationRemoved",{projectId:o,destinationId:t})},H=async n=>{var p;const{rtmpUrl:t,rtmpKey:o,destinationId:e,projectId:c=s.activeProjectId}=n,i=I(c),r={key:o,url:t},j=await((p=a.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:i.videoApi.project.collectionId,projectId:i.videoApi.project.projectId,destinationId:e,updateMask:["address.rtmpPush"],address:{rtmpPush:r}}));await d("DestinationChanged",j.destination)},L=async n=>{var j,p;const{projectId:t=s.activeProjectId,destinationId:o,props:e={}}=n,c=I(t),i=c.videoApi.project.destinations.find(l=>l.destinationId===o);if(!i)return;const r=await((p=a.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,destinationId:o,updateMask:["metadata"],metadata:{...i.metadata||{},props:{...((j=i.metadata)==null?void 0:j.props)||{},...e}}}));await d("DestinationChanged",r.destination)},J=n=>L({projectId:n.projectId,destinationId:n.destinationId,props:n.metadata}),_=async n=>{var p;const{enabled:t,destinationId:o,projectId:e=s.activeProjectId}=n,c=I(e);if(c.videoApi.project.destinations.find(l=>o===l.destinationId).enabled===t)return;const r=await((p=a.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,destinationId:o,updateMask:["enabled"],enabled:t}));await d("DestinationChanged",r.destination),P(t?"DestinationEnabled":"DestinationDisabled",{projectId:e,destinationId:o})},Q=async n=>{var j,p;const{rtmpUrl:t,rtmpKey:o,projectId:e=s.activeProjectId}=n,c=I(e),i={key:o,url:t},r=!0;if(c.videoApi.project.destinations.length>0){const l=await((j=a.clients.LiveApi().destination)==null?void 0:j.updateDestination({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,destinationId:c.videoApi.project.destinations[0].destinationId,updateMask:["address.rtmpPush"],address:{rtmpPush:i}}));await d("DestinationChanged",l.destination)}else{const l=await((p=a.clients.LiveApi().destination)==null?void 0:p.createDestination({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,address:{rtmpPush:i},enabled:r}));await d("DestinationAdded",l.destination)}P("DestinationSet",{projectId:e,rtmpUrl:t,rtmpKey:o})};export{z as addDestination,U as createNode,f as createProject,x as deleteNode,k as deleteProject,B as joinRoom,S as moveNode,G as removeDestination,F as reorderNodes,T as setActiveProject,Q as setDestination,_ as setDestinationEnabled,E as setNodeLayout,O as startBroadcast,W as stopBroadcast,q as swapNodes,H as updateDestination,J as updateDestinationMeta,L as updateDestinationProps,K as updateNode,R as updateProjectMeta,b as updateProjectProps,M as updateProjectPropsWithoutTrigger,N as updateUserProps};
//# sourceMappingURL=commands.a261e6b2.js.map