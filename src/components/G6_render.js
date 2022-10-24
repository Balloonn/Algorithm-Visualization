import G6 from '@antv/g6';

const G6_render = (data, id, dataStructure) => {

      let nodeCount = data.nodes.length;
      let edgeCount = data.edges.length;

        G6.registerBehavior('click-add-edge', {
          getEvents() {
            return {
              'node:click': 'onClick',
              mousemove: 'onMousemove',
              'edge:click': 'onEdgeClick' // 点击空白处，取消边
            };
          },
          onClick(ev) {
            const node = ev.item;
            const graph = this.graph;
            const point = {
              x: ev.x,
              y: ev.y
            };
            const model = node.getModel();
            
            if (this.addingEdge && this.edge) {
              graph.updateItem(this.edge, {
                target: model.id
              }); 
              graph.updateItem(this.edge2, {
                source: model.id
              }); 
              
              if(this.edge._cfg.source._cfg.id != this.edge._cfg.target._cfg.id)
              {
                let flag1 = true, flag2 = true;
                for(let i = 0; i < data.edges.length; i ++)
                {
                  if(data.edges[i].source == this.edge._cfg.source._cfg.id && data.edges[i].target === this.edge._cfg.target._cfg.id) {
                    flag1 = false;
                  }
                  
                  if(data.edges[i].target == this.edge._cfg.source._cfg.id && data.edges[i].source === this.edge._cfg.target._cfg.id) {
                    flag2 = false;
                  }
                }
                
                if(flag1) {
                  data.edges.push({
                    source: this.edge._cfg.source._cfg.id,
                    target: this.edge._cfg.target._cfg.id,
                    id: this.edge._cfg.id
                  });
                  dataStructure.addEdge(this.edge._cfg.source._cfg.id,this.edge._cfg.target._cfg.id,1);
                }
                
                if(flag2) {
                  data.edges.push({
                    source: this.edge._cfg.target._cfg.id,
                    target: this.edge._cfg.source._cfg.id,
                    id: this.edge2._cfg.id
                  });
                  dataStructure.addEdge(this.edge._cfg.target._cfg.id,this.edge._cfg.source._cfg.id,1);
                }
                  
              }
              
              this.edge = null;
              this.addingEdge = false;
            } else {
              this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
                id: `edge${edgeCount}`,
              });
              edgeCount++;
              this.edge2 = graph.addItem('edge', {
                source: point,
                target: model.id,
                id: `edge${edgeCount}`,
              });
              edgeCount++;
            this.addingEdge = true;
            }
          },
          onMousemove(ev) {
            const point = {
              x: ev.x,
              y: ev.y
            };
            if (this.addingEdge && this.edge) {
              this.graph.updateItem(this.edge, {
                target: point
              });
            }
          },
          onEdgeClick(ev) {
            const currentEdge = ev.item;
            // 拖拽过程中，点击会点击到新增的边上
            if (this.addingEdge && this.edge === currentEdge) {
              graph.removeItem(this.edge);
              graph.removeItem(this.edge2);
              edgeCount-=2;
              this.edge = null;
              this.addingEdge = false;
            }
          }
        });

      G6.registerBehavior('click-add-node', {
        getEvents() {
          return {
            'canvas:click': 'onClick'
          };
        },
        onClick(ev) {
          this.graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `${nodeCount}`, // 生成唯一的 id
            label: `${nodeCount}`,
          });
          data.nodes.push({
            id: `${nodeCount}`,
            x: ev.canvasX,
            y: ev.canvasY,
            edges: [],
            label: `${nodeCount}`,
          })
          dataStructure.addNode(nodeCount);
          nodeCount++;
          console.log(data);
          console.log(dataStructure)
        }
      });

      G6.registerBehavior('click-delete-node', {
        getEvents() {
          return {
            'node:click': 'onClick'
          };
        },
        onClick(ev) {
          const node = ev.item;
          const model = node.getModel();

          for(let i = 0; i < data.nodes.length; i ++) {
            if(model.id == data.nodes[i].id) {
              data.nodes.splice(i,1);
            }
          }
          for(let i = 0; i < dataStructure.nodes.length; i ++) {
            if(model.id == dataStructure.nodes[i].id) {
              dataStructure.nodes.splice(i,1);
            }
          }
          
          for(let i = 0; i < data.edges.length; i ++) {
            if(model.id == data.edges[i].source || model.id == data.edges[i].target) {
              data.edges.splice(i,1);
              i--;
            }
          }
          for(let i = 0; i < dataStructure.nodes.length; i ++) {
            let node = dataStructure.nodes[i];
            if(node.id == model.id) {
              dataStructure.nodes.splice(i,1);
            }
            else {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.id) {
                  node.adjList.splice(j,1);
                }
              }
            }
          }
          graph.removeItem(node);

          console.log(data.nodes)
          console.log(data.edges)
          console.log(dataStructure.nodes);
        }
      })

      G6.registerBehavior('click-delete-edge', {
        getEvents() {
          return {
            'edge:click': 'onClick'
          }
        },
        onClick(ev) {
          const edge = ev.item;
          const model = edge.getModel();
          for(let i = 0; i < data.edges.length; i ++) {
            if(data.edges[i].source == model.source && data.edges[i].target == model.target) {
              data.edges.splice(i,1);
            }
            if(data.edges[i].source == model.target && data.edges[i].target == model.source) {
              data.edges.splice(i,1);
            }
          }

          for(let i = 0; i < dataStructure.nodes.length; i ++) {
            const node = dataStructure.nodes[i];
            if(node.id == model.source) {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.target) {
                  node.adjList.splice(j,1);
                }
              }
            }
            if(node.id == model.target) {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.source) {
                  node.adjList.splice(j,1);
                }
              }
            }
          }

          graph.remove(edge);
        }
      })
      const graph = new G6.Graph({
        container: `${id}`, // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 1280,
        height: 960,
        fitViewPadding: [20, 50, 50, 20],
        modes: {
          default:['drag-node', 'click-select'],
          addNode:['click-add-node', 'click-select'],
          addEdge:['click-add-edge', 'click-select'],
          deleteNode:['click-delete-node', 'click-select'],
          deleteEdge:['click-delete-edge', 'click-select'],
        },
        defaultNode: {
          size:40,
          style: {
            fill: '#EAB4C4',
            stroke: '#F3F0E7',
            lineWidth: 1,
          },
        },
        defaultEdge: {
          style: {
            endArrow: true,
            startArrow: true,
          },
          color: '#DDD0C8',
          size:2.5,
        }
      });

      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();

      document.getElementById('selector').addEventListener('change', e => {
        const value = e.target.value;
        graph.setMode(value);
      })

}

export default G6_render